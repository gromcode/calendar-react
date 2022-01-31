import moment from 'moment';
import React, { useState } from 'react';
import { formatMins, getDateTime } from '../../utils/dateUtils';

import './modal.scss';

const Modal = ({ dateInfoForDefault, onHideModal, onSubmitModal }) => {
  const [eventData, setEventData] = useState({
    title: '',
    date: `${dateInfoForDefault[1].getFullYear()}-${formatMins(
      dateInfoForDefault[1].getMonth() + 1
    )}-${formatMins(dateInfoForDefault[1].getDate())}`,
    dateFrom: `${formatMins(dateInfoForDefault[0])}:00`,
    dateTo: `${formatMins(dateInfoForDefault[0] + 1)}:00`,
    // не корректно работает меньше чем за 15 минут до конца часа
    description: '',
  });

  console.log(eventData);

  const onChangeValueModal = (event) => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const onFormatedEvent = () => {
    const formattedEvent = {
      title: eventData.title,
      dateFrom: getDateTime(eventData.date, eventData.dateFrom),
      dateTo: getDateTime(eventData.date, eventData.dateTo),
      description: eventData.description,
    };

    onSubmitModal(formattedEvent);
  };

  return (
    <div className='modal overlay'>
      <div className='modal__content'>
        <div className='create-event'>
          <button className='create-event__close-btn' onClick={onHideModal}>
            +
          </button>
          <form className='event-form' onSubmit={onFormatedEvent}>
            <input
              type='text'
              name='title'
              placeholder='enter title'
              className='event-form__field'
              onChange={onChangeValueModal}
              value={eventData.title}
            />
            <div className='event-form__time'>
              <input
                type='date'
                name='date'
                className='event-form__field'
                onChange={onChangeValueModal}
                value={eventData.date}
              />
              <input
                type='time'
                name='dateFrom'
                className='event-form__field'
                onChange={onChangeValueModal}
                value={eventData.dateFrom}
              />
              <span>-</span>
              <input
                type='time'
                name='dateTo'
                className='event-form__field'
                onChange={onChangeValueModal}
                value={eventData.dateTo}
              />
            </div>
            <textarea
              name='description'
              placeholder='enter description'
              className='event-form__field'
              onChange={onChangeValueModal}
              value={eventData.description}
            ></textarea>
            <button type='submit' className='event-form__submit-btn'>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
