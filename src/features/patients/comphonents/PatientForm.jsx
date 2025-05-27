import React from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

import './PatientForm.css'
import { useAddPatientMutation, useGetPatientByIdQuery, useUpdatePatientMutation } from '../patientsApi'
import { NavLink, useParams } from 'react-router-dom';

const PatientForm = () => {

  
    const { id } = useParams()
    const isEdit = Boolean(id)
    const {data} = useGetPatientByIdQuery(id, {
      skip: !isEdit,
    })
    const patientData = data?.payload?.patient
    

    const emptyValues = {
     name: '',
    age: '', 
    dob: '',
    gender: '',
    contact: {
      phone: '',
      email: ''
    },
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: ''
    },
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    isFollowUp: false,
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    age: Yup.number().required('Age is required').min(0, 'Age must be a positive number'),
  })

  const onSubmit = (values) =>{
    isEdit ? updatePatient({id, formData: values}) : addPatient(values)
    formik.resetForm()
  }

  const [addPatient] = useAddPatientMutation()
  const [updatePatient] = useUpdatePatientMutation()

  const initialValues = isEdit && patientData 
                      ? patientData 
                      : emptyValues

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit
  })

  const {name, age, gender, contact, address, emergencyContact, isFollowUp} = formik.values

  return (
    <>
          <button className='btn'>
            <NavLink to="/patients" className="nav-link">Go to List</NavLink>
          </button>
      <section className="form-container">
        
        <h2>Patient Form</h2>

            <form id="patient-form" className="grid-form" onSubmit={formik.handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...formik.getFieldProps('name')}
                  placeholder="Enter patient name"
                  required
                />
                {formik.touched.name && formik.errors.name ? <span>{formik.errors.name}</span> : null}
              </div>
              <div className="form-row">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  {...formik.getFieldProps('age')}
                  placeholder="Enter age"
                  min="0"
                  required
                />
                {formik.touched.age && formik.errors.age ? <span>{formik.errors.age}</span> : null}
              </div>
              <div className="form-row">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" name="dob"  {...formik.getFieldProps('dob')} />
              </div>
              <div className="form-row">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" {...formik.getFieldProps('gender')}>
                  <option value="">Select gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="contact.phone"
                  {...formik.getFieldProps('contact.phone')}
                  placeholder="+8801XXXXXXXXX"
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="contact.email"
                  {...formik.getFieldProps('contact.email')}
                  onChange={formik.handleChange}
                  placeholder="example@mail.com"
                />
              </div>

              <fieldset className="fieldset grid-fieldset">
                <legend>Address</legend>
                <div className="form-row">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="address.street"
                    {...formik.getFieldProps('address.street')}
                    placeholder="Street address"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="address.city"
                    {...formik.getFieldProps('address.city')}
                    placeholder="City"
                  />
                    
                </div>
                <div className="form-row">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="address.postalCode"
                    {...formik.getFieldProps('address.postalCode')}
                    placeholder="Postal code"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="address.country"
                    {...formik.getFieldProps('address.country')}
                    placeholder="Country"
                  />
                </div>
              </fieldset>

              <fieldset className="fieldset grid-fieldset">
                <legend>Emergency Contact</legend>
                <div className="form-row">
                  <label htmlFor="eName">Name</label>
                  <input
                    type="text"
                    id="eName"
                    name="emergencyContact.name"
                    {...formik.getFieldProps('emergencyContact.name')}
                    placeholder="Contact name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="relation">Relation</label>
                  <input
                    type="text"
                    id="relation"
                    name="emergencyContact.relation"
                    {...formik.getFieldProps('emergencyContact.relation')}
                    placeholder="Relation"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="ePhone">Phone</label>
                  <input
                    type="tel"
                    id="ePhone"
                    name="emergencyContact.phone"
                    {...formik.getFieldProps('emergencyContact.phone')}
                    placeholder="+8801XXXXXXXXX"
                  />
                </div>
              </fieldset>

              <div className="form-row checkbox-row">
                <input
                  type="checkbox"
                  id="isFollowUp"
                  name="isFollowUp"
                  {...formik.getFieldProps('isFollowUp')}
                />
                <label htmlFor="isFollowUp">Is Follow‑Up?</label>
              </div>

              <div className="form-actions">
                <button type="reset" className="btn-outline">
                  Reset
                </button>
                <button type="submit" className="btn-primary">
                  {isEdit ? 'Update Patient' : 'Add Patient'}
                </button>
              </div>
            </form>

      </section>
    </>
  );
}

export default PatientForm