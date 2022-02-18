import React from 'react';
import './TileContainer.scss';
import {Col} from 'reactstrap';

export const TileContainer: React.FC = props => {
  return (
    <Col className={'TileContainer'} sm={12} md={6} lg={4}>
      {props.children}
    </Col>);
};
