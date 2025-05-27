import React from 'react'
import './BillingForm.css'

const BillingForm = () => {
  return (
    <><section className="form-container">
  <h2>Billing Form</h2>
  <form id="billing-form" className="grid-form">
    <div className="form-row">
      <label for="invoiceNo">Invoice No.</label>
      <input type="text" id="invoiceNo" name="invoiceNo" placeholder="INV-00123" required />
    </div>
    <div className="form-row">
      <label for="patient">Patient</label>
      <select id="patient" name="patient" required>
        <option value="">Select Patient</option>

      </select>
    </div>
    <div className="form-row">
      <label for="appointment">Appointment</label>
      <select id="appointment" name="appointment" required>
        <option value="">Select Appointment</option>
 
      </select>
    </div>


    <fieldset className="fieldset grid-fieldset">
      <legend>Line Items</legend>
      <div className="form-row">
        <label for="desc1">Description</label>
        <input type="text" id="desc1" name="lineItems[0].description" placeholder="Consultation fee" required />
      </div>
      <div className="form-row">
        <label for="amt1">Amount</label>
        <input type="number" id="amt1" name="lineItems[0].amount" placeholder="100" step="0.01" required />
      </div>
      <div className="form-row">
        <label for="qty1">Qty</label>
        <input type="number" id="qty1" name="lineItems[0].quantity" value="1" min="1" required />
      </div>
 
    </fieldset>

    <div className="form-row">
      <label for="taxPercent">Tax %</label>
      <input type="number" id="taxPercent" name="taxPercent" value="0" min="0" max="100" />
    </div>
    <div className="form-row">
      <label for="discountAmount">Discount</label>
      <input type="number" id="discountAmount" name="discountAmount" value="0" min="0" step="0.01" />
    </div>
    <div className="form-row">
      <label for="paymentMethod">Payment Method</label>
      <select id="paymentMethod" name="paymentMethod">
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="insurance">Insurance</option>
        <option value="online">Online</option>
      </select>
    </div>
    <div className="form-row">
      <label for="status">Status</label>
      <select id="status" name="status">
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>


    <div className="totals">
      <div>Sub‑Total: <span id="displaySubTotal">$0.00</span></div>
      <div>Tax Amount: <span id="displayTaxAmount">$0.00</span></div>
      <div>Discount: <span id="displayDiscount">$0.00</span></div>
      <div><strong>Total: <span id="displayTotal">$0.00</span></strong></div>
    </div>

    <div className="form-actions">
      <button type="reset" className="btn-outline">Reset</button>
      <button type="submit" className="btn-primary">Save Billing</button>
    </div>
  </form>
</section></>
  )
}

export default BillingForm