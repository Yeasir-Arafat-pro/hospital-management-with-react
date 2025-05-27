import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useGetPatientQuery } from "../../patients/patientsApi";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useUpdateRoomByIdMutation } from "../roomApi";

const RoomUpdate = () => {
  const { state } = useLocation();
  const { ward, roomNumber, bedNumber, _id } = state;
  const { data } = useGetPatientQuery();
  const patients = useMemo(() => data?.payload?.patients ?? [], [data]);
  const [updateRoomById] = useUpdateRoomByIdMutation()

  const initialValues = {
    patient: "",
    admittedAt: ''
  };

  const validationSchema = Yup.object({
    patient: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
  });
  const onSubmit = (values) => {
    const id = values.room
    const data = {
      patient: values.patient,
      admittedAt: values.admittedAt
    }
    updateRoomById({id,data})
  };

  return (
    <>
      <section className="form-container">
        <h2>Admit / Transfer Patient</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form id="admit-form" className="grid-form">
               <div  className="form-row">
      <label htmlFor="patient">Patient</label>
      <Field as='select' id="patient" name="patient" required>
        <option value="">Select Patient</option>
        {patients.map(patient=> (
          <option key={patient._id} value={patient?._id}>{patient?.name} - ({patient?.contact?.phone})</option>
        ))}
      </Field>

    </div>

    <div  className="form-row">
      <label htmlFor="room">Room</label>
      <Field as='select' id="room" name="room" required>
        <option value="">Select Room</option>
        <option value={_id}>{`${ward} - ${roomNumber} ${bedNumber}`}</option>


      </Field>
    </div>

    <div  className="form-row">
      <label htmlFor="admitDate">Admit Date &amp; Time</label>
      <Field type="datetime-local" id="admitDate" name="admittedAt"  />
    </div>

    <div  className="form-row">
      <label htmlFor="dischargeDate">Expected Discharge</label>
      <input type="datetime-local" id="dischargeDate" name="dischargedAt" />
    </div>

    <div  className="form-row grid-full">
      <label htmlFor="notes">Notes</label>
      <textarea id="notes" name="notes" rows="3" placeholder="Any special instructions..."></textarea>
    </div>

    <div  className="form-actions grid-full">
      <button type="reset"  className="btn-outline">Reset</button>
      <button type="submit"  className="btn-primary">Save Admission</button>
    </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default RoomUpdate;
