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

        <EmailIcon className={'icon button'}
                   onClick={() => window.open('mailto:fschwander@gmx.ch', '_self')}/>
        <GitIcon className={'icon button'}
                 onClick={() => window.open('https://gitlab.fhnw.ch/FabianSchwander', '_blank')}/>
        <LinkedInIcon className={'icon button'}
                      onClick={() => window.open('https://www.linkedin.com/in/fabian-schwander/', '_blank')}/>
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
