import React from 'react'
import './RoomForm.css'
const RoomForm = () => {

  

  return (
    <>
      <section className="form-container">
  <h2>Room Form</h2>
  <form id="room-form" className="grid-form">
    <div className="form-row">
      <label for="ward">Ward</label>
      <input type="text" id="ward" name="ward" placeholder="e.g. General" required />
    </div>
    <div className="form-row">
      <label for="roomNumber">Room Number</label>
      <input type="text" id="roomNumber" name="roomNumber" placeholder="e.g. 101" required />
    </div>
    <div className="form-row">
      <label for="bedNumber">Bed Number</label>
      <input type="text" id="bedNumber" name="bedNumber" placeholder="e.g. A" required />
    </div>
    <div className="form-row checkbox-row">
      <input type="checkbox" id="isAvailable" name="isAvailable" checked />
      <label for="isAvailable">Available</label>
    </div>
    <div className="form-row">
      <label for="patient">Assigned Patient</label>
      <select id="patient" name="patient">
        <option value="">None</option>
      </select>
    </div>
    <div className="form-row">
      <label for="admittedAt">Admitted At</label>
      <input type="datetime-local" id="admittedAt" name="admittedAt" />
    </div>
    <div className="form-row">
      <label for="dischargedAt">Discharged At</label>
      <input type="datetime-local" id="dischargedAt" name="dischargedAt" />
    </div>
    <div className="form-actions grid-full">
      <button type="reset" className="btn-outline">Reset</button>
      <button type="submit" className="btn-primary">Save Room</button>
    </div>
  </form>
</section>
    </>
  )
}

export default RoomForm