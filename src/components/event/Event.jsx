import React from 'react';

import './event.scss';

const Event = ({ height, marginTop, id, title, time, onDeleteEvent }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const clickHandler = (event) => {
    onDeleteEvent(event.target.dataset.id);
  };

  return (
    <div
      data-id={id}
      style={eventStyle}
      className='event'
      onClick={clickHandler}
    >
      <div data-id={id} className='event__title'>
        {title}
      </div>
      <div data-id={id} className='event__time'>
        {time}
      </div>
    </div>
  );
};

export default Event;
