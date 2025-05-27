import React, { use } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import "./DoctorForm.css"; // Assuming you have a CSS file for styling
import { useAddDoctorMutation } from "../doctorApi";
const DoctorForm = () => {
  const [addDoctor] = useAddDoctorMutation();

  const initialValues = {
    name: "",
    specialty: "",
    department: "",
    availability: [
      {
        day: "",
        from: "",
        to: "",
      },
    ],
    offDates: [],
    isActive: true, // অথবা false, যদি ওই JSON-এ না থাকে তবে default
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
  });

  const onSubmit = (values, { resetForm }) => {
     // availability time টুকু split করে hour/minute এ রূপান্তর
    const availabilityPayload = values.availability.map(slot => {
      const [fromHour, fromMinute] = slot.from.split(":").map(Number);
      const [toHour,   toMinute]   = slot.to.split(":").map(Number);
      return {
        day: slot.day,
        fromHour,
        fromMinute,
        toHour,
        toMinute
      };
    });

    const payload = {
      name:        values.name,
      specialty:   values.specialty,
      department:  values.department,
      availability: availabilityPayload,
      offDates:    values.offDates,
      isActive:    values.isActive
    };

    addDoctor(payload)
    // //resetForm();
    alert("Doctor added successfully!");
  };

  return (
    <>
      <section className="form-container">
        <h2>Doctor Form</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form id="doctor-form" className="grid-form">
            <fieldset className="fieldset grid-fieldset">
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Dr. John Doe"
                  required
                />
                <ErrorMessage name="name" />
              </div>
              <div className="form-row">
                <label htmlFor="specialty">Specialty</label>
                <Field
                  type="text"
                  id="specialty"
                  name="specialty"
                  placeholder="e.g. Cardiology"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="department">Department</label>
                <Field as="select" id="department" name="department" required>
                  <option value="">Select Department</option>
                  <option value="682caf98ba96df842eb4fbd5">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="oncology">Oncology</option>
                </Field>
              </div>
            </fieldset>
<FieldArray name="availability">
              {({ push, remove, form }) => {
  return <>
                  {form.values.availability.map((slot, idx) => (
                <fieldset className="fieldset grid-fieldset">
                  <legend>Availability Slots</legend>
                    <div key={idx} className="availability-slot">
                      <div className="form-row">
                        <label htmlFor={`day${idx}`}>Day</label>
                        <Field
                          as="select"
                          id={`day${idx}`}
                          name={`availability[${idx}].day`}
                          required
                        >
                          <option value="">Select Day</option>
                          <option>Monday</option>
                          <option>Tuesday</option>
                          <option>Wednesday</option>
                          <option>Thursday</option>
                          <option>Friday</option>
                        </Field>
                      </div>
                      <div className="form-row">
                        <label htmlFor={`from${idx}`}>From</label>
                        <Field
                          type="time"
                          id={`from${idx}`}
                          name={`availability[${idx}].from`}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor={`to${idx}`}>To</label>
                        <Field
                          type="time"
                          id={`to${idx}`}
                          name={`availability[${idx}].to`}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="btn-outline danger"
                        onClick={() => remove(idx)}
                        disabled={form.values.availability.length === 1}
                      >
                        Remove
                      </button>
                    </div>
                </fieldset>
                  ))}
                  <button
                  style={{height: "50px" }}
                    type="button"
                    className="btn-outline danger"
                    onClick={() => push({ day: "", from: "", to: "" })}
                  >
                    Add Slot
                  </button>
                  </>
              }}
              
            </FieldArray>

            <div className="form-row">
              <label htmlFor="offDates">Off Dates</label>
              <Field type="date" id="offDates" name="offDates[0]" multiple />
            </div>

            <div className="form-row checkbox-row">
              <Field type="checkbox" id="isActive" name="isActive" />
              <label htmlFor="isActive">Active?</label>
            </div>

            <div className="form-actions">
              <button type="reset" className="btn-outline">
                Reset
              </button>
              <button type="submit" className="btn-primary">
                Save Doctor
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default DoctorForm;
