import React, { useState } from 'react';
import { getDateTime } from '../../utils/dateUtils';

import './modal.scss';

const Modal = ({ onHideModal, onSubmitModal }) => {
  const [eventData, setEventData] = useState({
    title: null,
    date: null,
    dateFrom: null,
    dateTo: null,
    description: null,
  });

  const onChangeValueModal = (event) => {
    const { name, value, type } = event.target;
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
              placeholder='Title'
              className='event-form__field'
              onChange={onChangeValueModal}
            />
            <div className='event-form__time'>
              <input
                type='date'
                name='date'
                className='event-form__field'
                onChange={onChangeValueModal}
              />
              <input
                type='time'
                name='dateFrom'
                className='event-form__field'
                onChange={onChangeValueModal}
              />
              <span>-</span>
              <input
                type='time'
                name='dateTo'
                className='event-form__field'
                onChange={onChangeValueModal}
              />
            </div>
            <textarea
              name='description'
              placeholder='Description'
              className='event-form__field'
              onChange={onChangeValueModal}
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
