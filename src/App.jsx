import React, { Component, useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import events from './gateway/events';

import {
  getWeekStartDate,
  generateWeekRange,
  getFormatedMonth,
  getDateTime,
} from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState(
    generateWeekRange(getWeekStartDate(weekStartDate))
  );
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    setWeekDates(generateWeekRange(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

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
  const onCreateEvent = () => {
    setIsShowModal(true);
  };
  const onHideModal = () => {
    setIsShowModal(false);
  };

  const onSubmitModal = (eventInfo) => {
    events.push(eventInfo);
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
        isShowModal={isShowModal}
        onHideModal={onHideModal}
        onSubmitModal={onSubmitModal}
      />
    </>
  );
};

export default App;
