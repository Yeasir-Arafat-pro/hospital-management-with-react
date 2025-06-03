import React from 'react'
import './doctorDetail.css'
import {  useParams } from 'react-router-dom'
import { useGetDoctorByIdQuery } from '../doctorApi'


const DoctorDetail = () => {
    const {id} =useParams()
   // const navigate = useNavigate()
    const {data, isLoading, isError, error} =useGetDoctorByIdQuery(id)
    
    const doctor = data?.payload?.doctor

   // console.log(error.data.message);
    

//      const handlePatientEdit = async (id) => {
//     if (id) {
//       // Navigate to the edit page with the patient ID
//       return navigate(`/patients/${id}`)
//     }
//   }


if (isLoading) return <div> Loading... </div>
if (isError) return <div> {error?.data?.message} </div>

    
  return (
    <>


<section className="details-container">
  <h1>Doctor Details</h1>
  <div className="details-card">

    <div className="card-row">
      <div className="card-group">
        <h3>Name</h3>
        <p id="detail-name">{doctor.name}</p>
      </div>
      <div className="card-group">
        <h3>Specialty</h3>
        <p id="detail-specialty">{doctor.specialty}</p>
      </div>
      <div className="card-group">
        <h3>Department</h3>
        <p id="detail-department">{doctor.department.name}</p>
      </div>
    </div>

    <fieldset className="fieldset">
      <legend>Availability</legend>
      <div className="availability-list" id="detail-availability">
        <p>{doctor.readableAvailability}</p>
        {/* <p>Monday 09:00 - 13:00</p>
        <p>Wednesday 10:00 - 14:00</p>
        <p>Friday 09:00 - 12:00</p> */}
      </div>
    </fieldset>

    <fieldset className="fieldset">
      <legend>Off Dates</legend>
      <div className="offdates-list" id="detail-offdates">
        {doctor.offDates}
        {/* <p>2025-06-01</p>
        <p>2025-06-15</p> */}
      </div>
    </fieldset>

    <div className="card-row">
      <div className="card-group">
        <h3>Status</h3>
        <p id="detail-status"><span className={`status-badge ${doctor.isActive ? 'active' : 'inactive'}`}>{doctor.isActive ? 'Active' : 'Inactive'}</span></p>
      </div>
    </div>

    <div className="actions-row">
      <button className="btn-outline">Edit</button>
      <button className="btn-secondary">Back to List</button>
    </div>
  </div>
</section>


    </>
  )
}

export default DoctorDetail