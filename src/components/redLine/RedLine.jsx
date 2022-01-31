import React, { useEffect, useState } from 'react';

import './redLine.scss';

const RedLine = () => {
  const minutes = new Date().getMinutes();
  const [redLineStyle, setStyle] = useState({
    marginTop: new Date().getHours() * 60 + minutes - 2,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStyle({
        marginTop: new Date().getHours() * 60 + minutes - 2,
      });
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return <div style={redLineStyle} className='red-line'></div>;
};

export default RedLine;
