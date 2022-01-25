import React, { Component, useEffect, useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import events from '../../gateway/events';

import './calendar.scss';

const Calendar = (props) => {
  const [eventsDay, setEvents] = useState(events);

  const { weekDates } = props;

  useEffect(() => {
    const onCreateEvent = () => {
      console.log('create event');
    };

    return;
  }, []);

  return (
    <section className='calendar'>
      <Navigation weekDates={weekDates} />
      <div className='calendar__body'>
        <div className='calendar__week-container'>
          <Sidebar />
          <Week weekDates={weekDates} events={eventsDay} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
