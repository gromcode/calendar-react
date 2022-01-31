import React from 'react';

import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className='calendar__header'>
      {weekDates.map((dayDate) => (
        <div key={Math.random()} className='calendar__day-label day-label'>
          <span className='day-label__day-name'>{days[dayDate.getDay()]}</span>
          <span className='day-label__day-number'>{dayDate.getDate()}</span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;
