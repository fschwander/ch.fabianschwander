import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';

import {createRoot} from "react-dom/client";
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App/>)
