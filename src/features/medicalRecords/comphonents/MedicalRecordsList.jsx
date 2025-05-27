import React from 'react'
import './MedicalRecordsList.css'

const MedicalRecordsList = () => {
  return (
    <>
      <section className="page-header">
  <h1>Medical Records</h1>
  <div className="search-bar">
    <input type="text" placeholder="Search records..." id="record-search" />
    <button id="search-record-btn">🔍</button>
  </div>
</section>

<section className="table-container">
  <table className="data-table">
    <thead>
      <tr>
        <th>Appointment</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Diagnosis</th>
        <th>Follow‑Up</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>2025‑05‑10 10:00 AM</td>
        <td>John Doe</td>
        <td>Dr. Jane Smith</td>
        <td>Hypertension</td>
        <td>2025‑06‑10</td>
        <td>
          <button className="btn-outline">View</button>
          <button className="btn-outline danger">Edit</button>
        </td>
      </tr>

    </tbody>
  </table>
</section>

<nav className="pagination">
  <button className="page-btn" disabled>‹ Prev</button>
  <span>Page <strong>1</strong> of <strong>4</strong></span>
  <button className="page-btn">Next ›</button>
</nav>
    </>
  )
}

export default MedicalRecordsList