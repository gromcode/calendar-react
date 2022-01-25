import React, { Component, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const onCreateEvent = () => {
    console.log('create event');
  };
  // add build
  const onTodayMove = () => {
    console.log('today move');
  };
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header onCreateEvent={onCreateEvent} onTodayMove={onTodayMove} />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
