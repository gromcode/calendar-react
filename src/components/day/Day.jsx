import React, { useState } from 'react';
import Hour from '../hour/Hour';
import RedLine from '../redLine/RedLine';

import './day.scss';

const Day = ({ dataDay, dayEvents, onDeleteEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const [isToday, setIsToday] = useState(dataDay === new Date().getDate());

  return (
    <>
      <div className='calendar__day' data-day={dataDay}>
        {isToday && <RedLine />}
        {hours.map((hour) => {
          //getting all events from the day we will render
          const hourEvents = dayEvents.filter(
            (event) => event.dateFrom.getHours() === hour
          );

          return (
            <Hour
              key={dataDay + hour}
              onDeleteEvent={onDeleteEvent}
              dataHour={hour}
              hourEvents={hourEvents}
            />
          );
        })}
      </div>
    </>
  );
};

export default Day;
