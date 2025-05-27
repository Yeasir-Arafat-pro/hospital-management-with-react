import React from 'react'
import './PatientDetail.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPatientByIdQuery } from '../patientsApi'

const PatientDetail = () => {
    const {id} =useParams()
    const navigate = useNavigate()
    const {data} = useGetPatientByIdQuery(id)
    const patient = data?.payload?.patient

     const handlePatientEdit = async (id) => {
    if (id) {
      // Navigate to the edit page with the patient ID
      return navigate(`/patients/${id}`)
    }
  }
    
  return (
    <>

<section className="details-container">
  <h1>Patient Details</h1>
  
  <div className="details-card">
    <div className="card-row">
      <div className="card-group">
        <h3>Name</h3>
        <p id="detail-name">{patient?.name}</p>
      </div>
      <div className="card-group">
        <h3>Age</h3>
        <p id="detail-age">{patient?.age}</p>
      </div>
      <div className="card-group">
        <h3>Gender</h3>
        <p id="detail-gender">{patient?.gender}</p>
      </div>
    </div>
    <div className="card-row">
      <div className="card-group">
        <h3>Date of Birth</h3>
        <p id="detail-dob">{patient?.dob}</p>
      </div>
      <div className="card-group">
        <h3>Phone</h3>
        <p id="detail-phone">+88{patient?.contact?.phone}</p>
      </div>
      <div className="card-group">
        <h3>Email</h3>
        <p id="detail-email">{patient?.contact?.email}</p>
      </div>
    </div>
    <fieldset className="fieldset">
        
      <legend>Address</legend>
      <p id="detail-address">{patient?.address?.street}, {patient?.address?.city}, {patient?.address?.postalCode}, {patient?.address?.country}</p>
    </fieldset>
    <fieldset className="fieldset">
      <legend>Emergency Contact</legend>
      <div className="card-group">
        <h3>Name</h3>
        <p id="detail-e-name">{patient?.emergencyContact?.name}</p>
      </div>
      <div className="card-group">
        <h3>Relation</h3>
        <p id="detail-e-relation">{patient?.emergencyContact?.relation}</p>
      </div>
      <div className="card-group">
        <h3>Phone</h3>
        <p id="detail-e-phone">+88{patient?.emergencyContact?.phone}</p>
      </div>
    </fieldset>
    <div className="actions-row">
      <button className="btn-outline" onClick={() => handlePatientEdit(patient._id)}>Edit</button>
      <button className="btn-secondary" onClick={()=> navigate('/patients')}>Back to List</button>
    </div>
  </div>
</section>

    </>
  )
}

export default PatientDetail