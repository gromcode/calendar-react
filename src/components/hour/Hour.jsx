import React from 'react';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataHour,
  dataDate,
  hourEvents,
  onDeleteEvent,
  onCreateEvent,
}) => {
  const clickHandler = (event) => {
    const time = event.target.dataset.time;
    const date = new Date(+event.target.dataset.date);
    console.log(time, date);
    onCreateEvent(time, date);
  };

  return (
    <div
      onClick={clickHandler}
      className='calendar__time-slot'
      data-time={dataHour}
      data-date={dataDate}
    >
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const formatedDateFrom = new Date(dateFrom);
        const formatedDateTo = new Date(dateTo);
        const eventStart = `${formatedDateFrom.getHours()}:${formatMins(
          formatedDateFrom.getMinutes()
        )}`;
        const eventEnd = `${formatedDateTo.getHours()}:${formatMins(
          formatedDateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            onDeleteEvent={onDeleteEvent}
            //calculating event height = duration of event in minutes
            height={
              (formatedDateTo.getTime() - formatedDateFrom.getTime()) /
              (1000 * 60)
            }
            marginTop={formatedDateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default Hour;
