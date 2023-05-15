import React from 'react';
import './StaticTile.scss';

interface StaticTileProps {
  className?: string
}

export const StaticTile: React.FC<StaticTileProps> = props => {
  return (
    <div className={`StaticTile${props.className ? ` ${props.className}`:''}`}>
      {props.children}
    </div>
  );
};
