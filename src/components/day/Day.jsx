import React, { useState } from 'react';
import Hour from '../hour/Hour';
import RedLine from '../redLine/RedLine';

import './day.scss';

const Day = ({ dateDay, dayEvents, onDeleteEvent, onCreateEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const [isToday, setIsToday] = useState(
    dateDay.getDate() === new Date().getDate()
  );

  return (
    <>
      <div className='calendar__day' data-day={dateDay.getDate()}>
        {isToday && <RedLine />}
        {hours.map((hour) => {
          //getting all events from the day we will render
          const hourEvents = dayEvents.filter(
            (event) => new Date(event.dateFrom).getHours() === hour
          );

          return (
            <Hour
              key={dateDay + hour}
              onDeleteEvent={onDeleteEvent}
              onCreateEvent={onCreateEvent}
              dataHour={hour}
              dataDate={dateDay.getTime()}
              hourEvents={hourEvents}
            />
          );
        })}
      </div>
    </>
  );
};

export default Day;
