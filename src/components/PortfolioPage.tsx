import './PortfolioPage.scss';
import React from "react";
import {urlItems} from '../res/urlItemsData';
import {Container, Row} from 'reactstrap';
import {UrlTile} from './UrlTile';
import {TileContainer} from './TileContainer';
import {StaticTile} from './StaticTile';
import {ReactComponent as EmailIcon} from '../res/imgs/email.svg';
import {ReactComponent as GitIcon} from '../res/imgs/git.svg';
import {ReactComponent as LinkedInIcon} from '../res/imgs/linkedIn.svg';

export const PortfolioPage: React.FC = () => {

  const createUrlTiles = () => {
    return urlItems.map((el, i) => {
      return <TileContainer key={el.name + i}>
        <UrlTile data={el} index={i}/>
      </TileContainer>;
    });
  };

  const HeaderTile = () => {
    return <TileContainer>
      <StaticTile className={'HeaderTile'}>
        <h1>Portfolio</h1>
        <h2>Fabian Schwander</h2>
      </StaticTile>
    </TileContainer>;
  };

  const ContactsTile = () => {
    return <TileContainer>
      <StaticTile className={'ContactsTile'}>
        <h2>Kontakt</h2>

        <div className={'link button horizontal-container'}
             onClick={() => window.open('mailto:hallo@fabianschwander.ch', '_self')}>
          <EmailIcon className={'icon'}/>
          <p>E-Mail</p>
        </div>

        <div className={'link button horizontal-container'}
             onClick={() => window.open('https://github.com/fschwander', '_blank')}>
          <GitIcon className={'icon'}/>
          <p>Git</p>
        </div>

        <div className={'link button horizontal-container'}
             onClick={() => window.open('https://www.linkedin.com/in/fabian-schwander/', '_blank')}>
          <LinkedInIcon className={'icon'}/>
          <p>LinkedIn</p>
        </div>
      </StaticTile>
    </TileContainer>;
  };

  return (
    <div className={'PortfolioPage'}>
      <Container>
        <Row>
          <HeaderTile/>
          {createUrlTiles()}
          <ContactsTile/>
        </Row>
      </Container>
    </div>
  );
};
