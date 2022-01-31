import React, { Component, useEffect, useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import './calendar.scss';

const Calendar = ({
  weekDates,
  events,
  isShowModal,
  dateInfoForDefault,
  onHideModal,
  onSubmitModal,
  onDeleteEvent,
  onCreateEvent,
}) => {
  return (
    <section className='calendar'>
      {isShowModal && (
        <Modal
          onHideModal={onHideModal}
          onSubmitModal={onSubmitModal}
          dateInfoForDefault={dateInfoForDefault}
        />
      )}
      <Navigation weekDates={weekDates} />
      <div className='calendar__body'>
        <div className='calendar__week-container'>
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            onDeleteEvent={onDeleteEvent}
            onCreateEvent={onCreateEvent}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
