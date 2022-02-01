import React, { Component, useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { createEvent, deleteEvent, fetchEventInfo } from './gateway/events';

import {
  getWeekStartDate,
  generateWeekRange,
  getFormatedMonth,
  getDateTime,
} from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState(
    generateWeekRange(getWeekStartDate(weekStartDate))
  );
  const [isShowModal, setIsShowModal] = useState(false);
  const [dateInfoForDefault, setdateInfoForDefault] = useState([
    new Date().getHours(),
    new Date(),
  ]);

  useEffect(() => {
    setWeekDates(generateWeekRange(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

  const updateEvents = () => {
    fetchEventInfo().then((events) => {
      console.log(events);
      setEvents(events);
    });
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const onTodayMove = () => {
    setWeekStartDate(new Date());
  };

  const onSwitchWeekUp = () => {
    const plusSevenDay = weekStartDate.setDate(weekStartDate.getDate() + 7);
    setWeekStartDate(new Date(plusSevenDay));
  };

  const onSwitchWeekDown = () => {
    const minusSevenDay = weekStartDate.setDate(weekStartDate.getDate() - 7);
    setWeekStartDate(new Date(minusSevenDay));
  };

  const onCreateEvent = (hour, date) => {
    setIsShowModal(true);
    setdateInfoForDefault([+hour, date]);
  };

  const onDeleteEvent = (id) => {
    deleteEvent(id).then(() => {
      updateEvents();
    });
  };

  const onHideModal = () => {
    setIsShowModal(false);
  };

  const onSubmitModal = (eventInfo) => {
    createEvent(eventInfo).then(() => {
      updateEvents();
    });
    setIsShowModal(false);
  };
  return (
    <>
      <Header
        weekDates={weekDates}
        onCreateEvent={onCreateEvent}
        onTodayMove={onTodayMove}
        onSwitchWeekUp={onSwitchWeekUp}
        onSwitchWeekDown={onSwitchWeekDown}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        isShowModal={isShowModal}
        dateInfoForDefault={dateInfoForDefault}
        onCreateEvent={onCreateEvent}
        onHideModal={onHideModal}
        onSubmitModal={onSubmitModal}
        onDeleteEvent={onDeleteEvent}
      />
    </>
  );
};

export default App;
