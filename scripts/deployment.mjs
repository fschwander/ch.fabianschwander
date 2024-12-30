import { exec } from "child_process";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import FTPClient from "ftp";

dotenv.config();

// Configuration
const config = {
  buildCommand: "npm run build",
  buildDir: path.resolve(path.dirname(""), "build"), // Adjust this to your build output directory
  ftp: {
    host: process.env.FTP_HOST,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    remoteDir: process.env.FTP_REMOTE_DIR
  }
};

// Function to build the project
function buildProject() {
  return new Promise((resolve, reject) => {
    console.log("Building the project...");
    exec(config.buildCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Error during build:", error.message);
        return reject(error);
      }
      if (stderr) console.error("Build stderr:", stderr);
      console.log("Build output:", stdout);
      resolve();
    });
  });
}

// Helper function to upload files and directories recursively
function uploadDirectory(client, localDir, remoteDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(localDir, { withFileTypes: true }, (err, entries) => {
      if (err) return reject(err);

      const uploadPromises = entries.map((entry) => {
        const localPath = path.join(localDir, entry.name);
        const remotePath = `${remoteDir}/${entry.name}`;

        if (entry.isDirectory()) {
          return new Promise((res, rej) => {
            client.mkdir(remotePath, true, (mkdirErr) => {
              if (mkdirErr) return rej(mkdirErr);
              uploadDirectory(client, localPath, remotePath).then(res).catch(rej);
            });
          });
        } else {
          return new Promise((res, rej) => {
            client.put(localPath, remotePath, (putErr) => {
              if (putErr) return rej(putErr);
              console.log(`Uploaded: ${remotePath}`);
              res();
            });
          });
        }
      });

      Promise.all(uploadPromises).then(resolve).catch(reject);
    });
  });
}

// Function to deploy the project to the FTP server
function deployToFTP() {
  return new Promise((resolve, reject) => {
    const { host, username, password, remoteDir } = config.ftp;
    const client = new FTPClient();

    console.log("Connecting to FTP server...");

    client.on("ready", () => {
      console.log("Connected to FTP server.");

      if (!fs.existsSync(config.buildDir)) {
        return reject(new Error(`Build directory does not exist: ${config.buildDir}`));
      }

      client.mkdir(remoteDir, true, (err) => {
        if (err) {
          console.error("Failed to create remote directory:", err);
          return reject(err);
        }

        uploadDirectory(client, config.buildDir, remoteDir)
          .then(() => {
            client.end();
            resolve();
          })
          .catch((uploadErr) => {
            console.error("Failed to upload files:", uploadErr);
            client.end();
            reject(uploadErr);
          });
      });
    });

    client.on("error", (err) => {
      console.error("FTP error:", err);
      reject(err);
    });

    client.connect({
      host,
      user: username,
      password
    });
  });
}

// Main function to build and deploy
async function main() {
  try {
    await buildProject();
    await deployToFTP();
    console.log("🦅🦅🦅 Website successfully built and deployed! 🦅🦅🦅");
  } catch (error) {
    console.error("Failed to build or deploy the website:", error.message);
  }
}

main();
