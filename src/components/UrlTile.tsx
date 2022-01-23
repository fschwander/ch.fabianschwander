import React, {useEffect, useRef, useState} from 'react';
import './UrlTile.scss';

interface UrlTileProps {
  data: any,
  index: number
}

export const UrlTile: React.FC<UrlTileProps> = props => {
  const isInitialMount = useRef(true);
  const {data} = props;

  const colors = ['#ff1493', '#00bfff', '#663399'];
  const animationInterval = 12 * 1000;
  const animationOffset = useRef(props.index === 0 ? 0 : Math.floor(Math.random() * animationInterval / 2));

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const getRandomDeg = () => Math.floor(Math.random() * 360);

  const getAlternatingColor = (discardedColors: Array<string>): string => {
    let newColor = getRandomColor();
    discardedColors.forEach(color => {
      while (newColor === color) newColor = getRandomColor();
    });
    return newColor;
  };

  const getRandomGradient = () => {
    const color1 = getRandomColor();
    const color2 = getAlternatingColor([color1]);
    return `linear-gradient(${getRandomDeg()}deg, ${color1}, ${color2})`;
  };

  const [gradient1, setGradient1] = useState(getRandomGradient());
  const [gradient2, setGradient2] = useState(getRandomGradient());

  useEffect(() => {
    if (isInitialMount.current) {
      setTimeout(() => {
        setInterval(() => setGradient1(getRandomGradient), animationInterval);
        setTimeout(() => setInterval(() => setGradient2(getRandomGradient), animationInterval), animationInterval / 2);
      }, animationOffset.current);
      isInitialMount.current = false;
    }
  });

  return (
    <div className={'UrlTile button'}
         onClick={() => window.open(data.url, '_blank')}>
      <div className={'background'} style={{backgroundImage: gradient1}}/>
      <div className={'background gradient-overlay'}
           style={{
             backgroundImage: gradient2,
             animationDuration: `${animationInterval / 2}ms`,
             animationDelay: `${animationOffset.current}ms`
           }}/>
      <div className={'background filter'}/>

      <div className={'text-container'}>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <p>{data.tech}</p>
      </div>
    </div>
  );
};
