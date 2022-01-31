import React from 'react';

import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className='calendar__header'>
      {weekDates.map((dayDate) => {
        const className =
          dayDate.getDate() === new Date().getDate()
            ? 'calendar__day-label day-label calendar__day-label_today'
            : 'calendar__day-label day-label';
        return (
          <div key={Math.random()} className={className}>
            <span className='day-label__day-name'>
              {days[dayDate.getDay()]}
            </span>
            <span className='day-label__day-number'>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
