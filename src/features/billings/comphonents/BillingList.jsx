import React, { useMemo, useState } from 'react'
import './BillingList.css'
import { useGetBillingQuery } from '../billingApi'
import { NavLink } from 'react-router-dom'
import BasicTable from '../../../Comphonents/BasicTable'
import { format } from 'date-fns'

const BillingList = () => {

  const { data: billingData, isLoading, error } = useGetBillingQuery()

    const billing = useMemo(() => billingData?.payload?.bills ?? [], [billingData]);
    console.log('billing', billing);

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
    {
     header: 'Invoice No.',
    accessorKey: 'invoiceNo'
   },
   {
     header: 'Patient',
    accessorKey: 'patient.name'
   },
   {
     header: 'Appointment Date',
    accessorFn: row => format(new Date(row.appointment.datetime), 'dd MMM  yyyy')
   },
   {
     header: 'Sub Total',
    accessorKey: 'subTotal'
   },
    {
     header: 'Tax',
    accessorKey: 'taxAmount'
   },
    {
     header: 'Discount',
    accessorKey: 'discountAmount'
   },
    {
     header: 'Total Amount',
    accessorKey: 'totalAmount'
   },
   {
     header: 'Status',
    accessorFn: row => row.status === 'paid' 
                        ? <span className="status-badge paid">Paid</span> 
                        :  <span className="status-badge pending">Pending</span>,
    cell: info => info.getValue(),

   },

   {
     header: 'Actions',
    cell: (info) => (
      <>
        <button className="btn-outline">Edit</button>
        <button className="btn-outline danger">Delete</button>
      </>
    ),

  }

]

const [filtering, setFiltering] = useState([])

  return (
    <>
      <section className="page-header">
        <button className="btn">
          <NavLink to="/billing/create" className='nav-link'>
            Add Billing
          </NavLink>
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search Patients..." id="user-search" onChange={(e)=> setFiltering(e.target.value)} />
          <button id="search-user-btn">🔍</button>
        </div>
      </section>
      <BasicTable data={billing} columns={columns} filtering={filtering} setFiltering={setFiltering}  />

    </>
  )
}

export default BillingList

//   <>
//         <section className="page-header">
//   <h1>Billing Records</h1>
//   <div className="search-bar">
//     <input type="text" placeholder="Search invoices..." id="billing-search" />
//     <button id="search-billing-btn">🔍</button>
//   </div>
// </section>

// <section className="table-container">
//   <table className="data-table">
//     <thead>
//       <tr>
//         <th>Invoice No.</th>
//         <th>Patient</th>
//         <th>Appointment Date</th>
//         <th>Sub‑Total</th>
//         <th>Tax</th>
//         <th>Discount</th>
//         <th>Total</th>
//         <th>Status</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>

//       <tr>
//         <td>INV‑00123</td>
//         <td>John Doe</td>
//         <td>2025‑05‑10</td>
//         <td>$200.00</td>
//         <td>$10.00</td>
//         <td>$5.00</td>
//         <td>$205.00</td>
//         <td><span className="status-badge paid">Paid</span></td>
//         <td>
//           <button className="btn-outline">View</button>
//           <button className="btn-outline danger">Print</button>
//         </td>
//       </tr>

//     </tbody>
//   </table>
// </section>

// <nav className="pagination">
//   <button className="page-btn" disabled>‹ Prev</button>
//   <span>Page <strong>1</strong> of <strong>8</strong></span>
//   <button className="page-btn">Next ›</button>
// </nav>
//    </>