import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, onDeleteEvent, onCreateEvent, events }) => {
  return (
    <div className='calendar__week'>
      {weekDates.map((day) => {
        /* const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        ); */

        const dayEvents = events
          .slice()
          .filter(
            (event) =>
              new Date(event.dateFrom).getMonth() === day.getMonth() &&
              new Date(event.dateTo).getDate() === day.getDate()
          );

        return (
          <Day
            onDeleteEvent={onDeleteEvent}
            onCreateEvent={onCreateEvent}
            key={day.getTime()}
            dateDay={day}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};
Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Week;
