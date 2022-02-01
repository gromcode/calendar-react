import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
  const [isDisabled, setIsDisabled] = useState(true);
  const [classNames, setClassNames] = useState({
    title: 'event-form__field_invalid',
    date: 'event-form__field',
    dateFrom: 'event-form__field',
    dateTo: 'event-form__field',
  });
  const [messageError, setMessageError] = useState('enter title please');

  useEffect(() => {
    validate();
  }, [eventData]);

  const validateTitle = (value) => {
    if (value) {
      setMessageError('');
      setClassNames({
        ...classNames,
        title: 'event-form__field',
      });
      return true;
    }
    setMessageError('enter title please');
    setClassNames({
      ...classNames,
      title: 'event-form__field_invalid',
    });
    return false;
  };

  const validateDate = (name, value) => {
    const mins = +value.split(':')[1];
    if (mins % 15 === 0) {
      setClassNames({
        ...classNames,
        [name]: 'event-form__field',
      });
      return true;
    }
    setMessageError('minutes must be a multiple of 15');
    setClassNames({
      ...classNames,
      [name]: 'event-form__field_invalid',
    });
    return false;
  };

  const validateDataEvent = () => {
    // ожидает что все поля валидны
    // 1. начало и длительность должны быть кратны 15 минутам
    // 2. не дольше 6 часов
    // 3. пересечение событий
    const { date, dateFrom, dateTo } = eventData;
    const [hourFrom, minutesFrom] = dateFrom.split(':').map((el) => +el);
    const [hourTo, minutesTo] = dateTo.split(':').map((el) => +el);
    if (hourFrom > hourTo) {
      setMessageError('incorrect date');
      return false;
    }
    if (hourFrom === hourTo && minutesFrom > minutesTo) {
      setMessageError('incorrect date');
      return false;
    }
    if (hourFrom === hourTo && minutesFrom === minutesTo) {
      setMessageError('incorrect date');
      return false;
    }
    const duration = hourTo * 60 + minutesTo - hourFrom * 60 + minutesFrom;
    if (duration > 360) {
      setMessageError('too long event');
      return false;
    }

    return true;
  };

  const validateField = (name, value) => {
    if (name === 'title') {
      return validateTitle(value);
    }

    if (name === 'dateFrom') {
      return validateDate(name, value);
    }

    if (name === 'dateTo') {
      return validateDate(name, value);
    }
  };

  const validate = () => {
    const entriesEvent = Object.entries(eventData);
    const arrBool = entriesEvent
      .map(([name, value]) => validateField(name, value))
      .filter((el) => typeof el === 'boolean');

    if (!arrBool.every((isValid) => isValid === true)) {
      setIsDisabled(true);
      return false;
    }
    if (!validateDataEvent()) {
      setIsDisabled(true);
      return false;
    }
    setIsDisabled(false);
  };

  const onChangeValueModal = (event) => {
    const { name, value } = event.target;

    validateField(name, value);

    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const onFormatedEvent = (event) => {
    event.preventDefault();
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
          <div className='create-event__header-window'>
            <span className='create-event__message-error'>{messageError}</span>
            <button className='create-event__close-btn' onClick={onHideModal}>
              +
            </button>
          </div>

          <form className='event-form' onSubmit={onFormatedEvent}>
            <input
              type='text'
              name='title'
              placeholder='enter title'
              className={classNames.title}
              onChange={onChangeValueModal}
              value={eventData.title}
              required
            />
            <div className='event-form__time'>
              <input
                type='date'
                name='date'
                className={classNames.date}
                onChange={onChangeValueModal}
                value={eventData.date}
                required
              />
              <input
                type='time'
                name='dateFrom'
                className={classNames.dateFrom}
                onChange={onChangeValueModal}
                value={eventData.dateFrom}
                required
              />
              <input
                type='time'
                name='dateTo'
                className={classNames.dateTo}
                onChange={onChangeValueModal}
                value={eventData.dateTo}
                required
              />
            </div>
            <textarea
              name='description'
              placeholder='enter description'
              className='event-form__field'
              onChange={onChangeValueModal}
              value={eventData.description}
            ></textarea>
            <button
              disabled={isDisabled}
              type='submit'
              className='event-form__submit-btn'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
