import React, { useMemo, useState } from "react";

import {NavLink} from 'react-router-dom'


import BasicTable from "../../../Comphonents/BasicTable";
import { useGetPatientQuery } from "../patientsApi";

//const columnHelper = createColumnHelper();

const PatientList = () => {
  const { data } = useGetPatientQuery();
  const patients = useMemo(() => data?.payload?.patients ?? [], [data]);
console.log(patients);

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
   {
     header: 'Name',
    accessorKey: 'name'
   },
   {
     header: 'Email',
    accessorKey: 'contact.email'
   },
   {
     header: 'Phone',
    accessorKey: 'contact.phone'
   },
   {
     header: 'Address',
    accessorFn: row => `${row.address?.street}, ${row.address?.city}`,
      cell: info => info.getValue()
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
          <NavLink to="/patients/create" className='nav-link'>
            Add Patient
          </NavLink>
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search Patients..." id="user-search" onChange={(e)=> setFiltering(e.target.value)} />
          <button id="search-user-btn">🔍</button>
        </div>
      </section>
      <BasicTable data={patients} columns={columns} filtering={filtering} setFiltering={setFiltering}  />

    </>
  );
};

export default PatientList;







// import React, { useEffect } from 'react'
// import { Navigate, NavLink, useNavigate } from 'react-router-dom'
// import { GoSortAsc } from "react-icons/go";
// import { GoSortDesc } from "react-icons/go";

// import './PatientList.css' // Assuming you have a CSS file for styling
// import { useDeletePatientMutation, useGetPatientQuery } from '../patientsApi'
// const PatientList = () => {
//   const navigate = useNavigate()

//   const [search, setSearch] = React.useState('')
//   const [page, setPage] = React.useState(1)
//   const [limit, setLimit] = React.useState(15)
//   const [sortBy, setSortBy] = React.useState('createdAt')
//   const [sortOrder, setSortOrder] = React.useState('desc')

//   const { data: patients, error, isLoading } = useGetPatientQuery({search, page, limit, sortBy, sortOrder})

//   const [deletePatient] = useDeletePatientMutation()

//   const handlePatientDelete = async (id) => {
//     await deletePatient(id)
//   }

//   const handlePatientEdit = async (id) => {
//     if (id) {
//       // Navigate to the edit page with the patient ID
//       return navigate(`/patients/${id}`)
//     }
//   }

//   const handlePatientView = async (id) => {
//     if (id) {
//       // Navigate to the edit page with the patient ID
//       return navigate(`/patients/details/${id}`)
//     }
//   }

//   const handleSorting = (field) => {
//     setSortBy(field)
//     setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
//   }

//   const handleBtn = (field) => {
//       return <button onClick={()=>handleSorting(field)}>{sortOrder === 'asc' && sortBy === field ? <GoSortAsc /> : <GoSortDesc />}</button>
//   }

//   // const sortOrderBtn = <button onClick={handleSorting}>{sortOrder === 'asc' ? <GoSortAsc /> : <GoSortDesc />}</button>

//   return (
//     <>

// <section className="page-header">

//   <button className='page-btn'>
//     <NavLink to="/patients/create" className="nav-link">Add Patient</NavLink>
//   </button>


//   <div className="search-bar">
//     <input type="text" placeholder="Search patients..." id="patient-search" onChange={(e) => setSearch(e.target.value)} />
//     <button id="search-btn">🔍</button>
//   </div>
// </section>

// <section className="table-container">
//   <table className="data-table">
//     <thead>
//       <tr>
//         <th>Name {handleBtn('name')}</th>
//         <th>Age {handleBtn('age')}</th>
//         <th>Gender {handleBtn('gender')}</th>
//         <th>Phone {handleBtn('phone')}</th>
//         <th>Email {handleBtn('email')}</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
// {isLoading && <tr><td colSpan="6">Loading...</td></tr>}
// {error && <tr><td colSpan="6">Error: {error.message}</td></tr>}
//       {!isLoading && !error && patients &&patients?.payload?.patients?.map((patient) => {
//     if (patient.isDeleted === false) {
//       return (
//         <tr key={patient._id}>
//           <td>{patient.name}</td>
//           <td>{patient.age}</td>
//           <td>{patient.gender}</td>
//           <td>{patient.contact.phone}</td>
//           <td>{patient.contact.email}</td>
//           <td>
//             <button
//               className="btn-outline danger"
//               onClick={() => handlePatientView(patient._id)}
//             >
//               View
//             </button>
//             <button
//               className="btn-outline danger"
//               onClick={() => handlePatientEdit(patient._id)}
//             >
//               Edit
//             </button>
//             <button
//               className="btn-outline danger"
//               onClick={() => handlePatientDelete(patient._id)}
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       );
//     }
//   })}

//     </tbody>
//   </table>
// </section>

// <nav className="pagination">
//   <button className="page-btn" disabled>‹ Prev</button>
//   <span>Page <strong>1</strong> of <strong>10</strong></span>
//   <button className="page-btn">Next ›</button>
// </nav>

//     </>
//   )
// }

// export default PatientList