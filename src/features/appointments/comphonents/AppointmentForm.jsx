import React from 'react'
import './AppointmentForm.css'

const AppointmentForm = () => {
  return (
    <>

<section className="page-header">
  <h1>Appointment Scheduler</h1>
  <div className="search-bar">
    <input type="text" placeholder="Search appointments..." id="appointment-search" />
    <button id="search-appointment-btn">🔍</button>
  </div>
</section>

<div className="scheduler-container">

  <aside className="calendar-panel">
    <input type="date" id="schedule-date" className="date-picker" />
    <ul className="time-slots">
      <li><button className="slot-btn">09:00 AM</button></li>
      <li><button className="slot-btn">09:30 AM</button></li>
      <li><button className="slot-btn">10:00 AM</button></li>
      <li><button className="slot-btn">10:30 AM</button></li>
      <li><button className="slot-btn">11:00 AM</button></li>
      <li><button className="slot-btn">11:30 AM</button></li>
      <li><button className="slot-btn">12:00 PM</button></li>
 
    </ul>
  </aside>


  <section className="form-container scheduler-form">
    <h2>New Appointment</h2>
    <form id="appointment-form" className="grid-form">
      <div className="form-row">
        <label for="patient">Patient</label>
        <select id="patient" name="patient" required>
          <option value="">Select Patient</option>
          <option>John Doe</option>
          <option>Jane Smith</option>
        </select>
      </div>
      <div className="form-row">
        <label for="doctor">Doctor</label>
        <select id="doctor" name="doctor" required>
          <option value="">Select Doctor</option>
          <option>Dr. Alice</option>
          <option>Dr. Bob</option>
        </select>
      </div>
      <div className="form-row">
        <label for="date">Date</label>
        <input type="date" id="date" name="datetime" required />
      </div>
      <div className="form-row">
        <label for="time">Time</label>
        <input type="time" id="time" name="time" required />
      </div>
      <div className="form-actions">
        <button type="reset" className="btn-outline">Reset</button>
        <button type="submit" className="btn-primary">Schedule</button>
      </div>
    </form>
  </section>
</div>

<nav className="pagination">
  <button className="page-btn" disabled>‹ Prev</button>
  <span>Page <strong>1</strong> of <strong>5</strong></span>
  <button className="page-btn">Next ›</button>
</nav>

    </>
  )
}

export default AppointmentForm