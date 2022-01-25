import React, { Component, useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import {
  getWeekStartDate,
  generateWeekRange,
  getMonth,
} from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState(
    generateWeekRange(getWeekStartDate(weekStartDate))
  );

  useEffect(() => {
    setWeekDates(generateWeekRange(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

  const onCreateEvent = () => {
    console.log('create event');
  };

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

  return (
    <>
      <Header
        month={getMonth(weekStartDate)}
        onCreateEvent={onCreateEvent}
        onTodayMove={onTodayMove}
        onSwitchWeekUp={onSwitchWeekUp}
        onSwitchWeekDown={onSwitchWeekDown}
      />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
