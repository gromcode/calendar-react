import React, { Component, useEffect, useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import './calendar.scss';

const Calendar = ({ weekDates, isShowModal, onHideModal, onSubmitModal }) => {
  return (
    <section className='calendar'>
      {isShowModal && (
        <Modal onHideModal={onHideModal} onSubmitModal={onSubmitModal} />
      )}
      <Navigation weekDates={weekDates} />
      <div className='calendar__body'>
        <div className='calendar__week-container'>
          <Sidebar />
          <Week weekDates={weekDates} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
