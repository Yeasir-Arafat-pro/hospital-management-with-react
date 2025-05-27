import React from 'react'
import './MedicalRecordForm.css'

const MedicalRecordForm = () => {
  return (
    <>
      <section className="form-container">
  <h2>Medical Record Form</h2>
  <form id="record-form" className="grid-form">
    <div className="form-row">
      <label for="appointment">Appointment</label>
      <select id="appointment" name="appointment" required>
        <option value="">Select Appointment</option>
 
      </select>
    </div>
    <div className="form-row">
      <label for="patient">Patient</label>
      <select id="patient" name="patient" required>
        <option value="">Select Patient</option>

      </select>
    </div>
    <div className="form-row">
      <label for="doctor">Doctor</label>
      <select id="doctor" name="doctor" required>
        <option value="">Select Doctor</option>

      </select>
    </div>

    <div className="form-row grid-full">
      <label for="diagnosis">Diagnosis</label>
      <textarea id="diagnosis" name="diagnosis" rows="2" placeholder="Describe diagnosis..." required></textarea>
    </div>

 
    <fieldset className="fieldset grid-fieldset grid-full">
      <legend>Prescription</legend>
      <div className="form-row">
        <label for="med1">Medicine</label>
        <input type="text" id="med1" name="prescription[0].medicineName" placeholder="e.g. Paracetamol" required />
      </div>
      <div className="form-row">
        <label for="dos1">Dosage</label>
        <input type="text" id="dos1" name="prescription[0].dosage" placeholder="e.g. 500mg" required />
      </div>
      <div className="form-row">
        <label for="freq1">Frequency</label>
        <input type="text" id="freq1" name="prescription[0].frequency" placeholder="e.g. 3 times/day" required />
      </div>
     
    </fieldset>

    <div className="form-row grid-full">
      <label for="advice">Advice</label>
      <textarea id="advice" name="advice" rows="2" placeholder="Any additional advice..."></textarea>
    </div>

    <div className="form-row">
      <label for="followUpDate">Follow‑Up Date</label>
      <input type="date" id="followUpDate" name="followUpDate" />
    </div>

    <div className="form-actions grid-full">
      <button type="reset" className="btn-outline">Reset</button>
      <button type="submit" className="btn-primary">Save Record</button>
    </div>
  </form>
</section>
    </>
  )
}

export default MedicalRecordForm