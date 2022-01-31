import React, { useEffect, useState } from 'react';
import Day from '../day/Day';
import events from '../../gateway/events';

import './week.scss';

const Week = ({ weekDates }) => {
  const [allEvents, setAllEvents] = useState(events);

  useEffect(() => {
    setAllEvents(events);
  }, [events]);

  const onDeleteEvent = (id) => {
    const newEvents = allEvents.filter((event) => event.id !== +id);
    setAllEvents(newEvents);
  };

  return (
    <div className='calendar__week'>
      {weekDates.map((day) => {
        /* const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        ); */

        //getting all events from the day we will render
        const dayEvents = allEvents
          .slice()
          .filter(
            (event) =>
              event.dateFrom.getMonth() === day.getMonth() &&
              event.dateTo.getDate() === day.getDate()
          );

        return (
          <Day
            onDeleteEvent={onDeleteEvent}
            key={day.getTime()}
            dataDay={day.getDate()}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;
