import React, { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { format } from "date-fns";

import "./AppointmentList.css";
import { useAddAppointmentMutation, useGetAppointmentSlotsQuery } from "../appointmentApi";
import { useGetPatientQuery } from "../../patients/patientsApi";
import { useGetDoctorQuery } from "../../doctors/doctorApi";

const AppointmentList = () => {
  const [timeSlot, setTimeSlot] = useState('')
  const [dateTime, setDateTime] = useState(new Date());
  
  const formatedDate = format(new Date(dateTime), "yyyy-MM-dd");

  const { data } = useGetAppointmentSlotsQuery(formatedDate);
  const { data: patientData } = useGetPatientQuery();
  const { data: doctorData } = useGetDoctorQuery();

  const [addAppointment] = useAddAppointmentMutation()

  const slots = useMemo(() => data?.payload?.slots ?? [], [data]);

  const patients = useMemo(
    () => patientData?.payload?.patients ?? [],
    [patientData]
  );
  const doctors = useMemo(
    () => doctorData?.payload?.doctors ?? [],
    [doctorData]
  );

  const handleTimeSlot = (slot) => {
    setTimeSlot(slot)
  }


  const initialValues = {
    patient: "",
    doctor: "",
    datetime:formatedDate,
    time: timeSlot
  };

  const onSubmit = (values) => {
    const appointment = {
      patient: values.patient,
      doctor: values.doctor,
      datetime: values.datetime && values.time ? `${values.datetime}T${values.time}:00.000Z` : `${formatedDate}T${timeSlot}:00.000Z`
    }
    
    addAppointment(appointment)
  }

  return (
    <>
      <section className="page-header">
        <h1>Appointment Scheduler</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search appointments..."
            id="appointment-search"
          />
          <button id="search-appointment-btn">🔍</button>
        </div>
      </section>

      <div className="scheduler-container">
        <aside className="calendar-panel">
          <input
            type="date"
            id="schedule-date"
            className="date-picker"
            value={formatedDate}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <ul className="time-slots">
            {slots &&
              slots.map((slot) => (
                <li key={slot}>
                  <button type="button" className="slot-btn" onClick={() => handleTimeSlot(slot)}>{slot}</button>
                </li>
              ))}
          </ul>
        </aside>

        <section className="form-container scheduler-form">
          <h2>New Appointment</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form id="appointment-form" className="grid-form">
              <div className="form-row">
                <label htmlFor="patient">Patient</label>
                <Field as="select" id="patient" name="patient" required>
                  <option value="">Select Patient</option>
                  {patients &&
                    patients.map((patient) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.name}
                      </option>
                    ))}
                </Field>
              </div>
              <div className="form-row">
                <label htmlFor="doctor">Doctor</label>
                <Field as="select" id="doctor" name="doctor" required>
                  <option value="">Select Doctor</option>
                  {doctors &&
                    doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  <option>Dr. Bob</option>
                </Field>
              </div>
              <div className="form-row">
                <label htmlFor="date">Date</label>
                <Field type="date" id="date" name="datetime" />
              </div>
              <div className="form-row">
                <label htmlFor="time">Time</label>
                <Field type="time" id="time" name="time" required/>
              </div>
              <div className="form-actions">
                <button type="reset" className="btn-outline">
                  Reset
                </button>
                <button type="submit" className="btn-primary">
                  Schedule
                </button>
              </div>
            </Form>
          </Formik>
        </section>
      </div>

      <nav className="pagination">
        <button className="page-btn" disabled>
          ‹ Prev
        </button>
        <span>
          Page <strong>1</strong> of <strong>5</strong>
        </span>
        <button className="page-btn">Next ›</button>
      </nav>
    </>
  );
};

export default AppointmentList;
