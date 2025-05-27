import React from 'react'
import './BillingList.css'

const BillingList = () => {
  return (
   <>
        <section className="page-header">
  <h1>Billing Records</h1>
  <div className="search-bar">
    <input type="text" placeholder="Search invoices..." id="billing-search" />
    <button id="search-billing-btn">🔍</button>
  </div>
</section>

<section className="table-container">
  <table className="data-table">
    <thead>
      <tr>
        <th>Invoice No.</th>
        <th>Patient</th>
        <th>Appointment Date</th>
        <th>Sub‑Total</th>
        <th>Tax</th>
        <th>Discount</th>
        <th>Total</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>INV‑00123</td>
        <td>John Doe</td>
        <td>2025‑05‑10</td>
        <td>$200.00</td>
        <td>$10.00</td>
        <td>$5.00</td>
        <td>$205.00</td>
        <td><span className="status-badge paid">Paid</span></td>
        <td>
          <button className="btn-outline">View</button>
          <button className="btn-outline danger">Print</button>
        </td>
      </tr>

    </tbody>
  </table>
</section>

<nav className="pagination">
  <button className="page-btn" disabled>‹ Prev</button>
  <span>Page <strong>1</strong> of <strong>8</strong></span>
  <button className="page-btn">Next ›</button>
</nav>
   </>
  )
}

export default BillingList