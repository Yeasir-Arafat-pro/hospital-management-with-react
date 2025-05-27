import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./DepartmentForm.css";
import FormikControl from "../../../Comphonents/Formik/FormikControl";
import { useAddDepartmentMutation } from "../departmentApi";

const DepartmentForm = () => {
  const [addDepartment] = useAddDepartmentMutation()
  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = async (val) => {
    console.log('dep');

  await  addDepartment(val)
    console.log(val);
    //submitProps.setSubmitting(false)
  };
    console.log('render');

  return (
    <>
      <section className="form-container">
        <h2>Department Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({isValid, isSubmitting, dirty}) => {
            return (
              <Form id="department-form" className="grid-form">
                <FormikControl
                  control="input"
                  type="text"
                  name="name"
                  label="Department Name"
                  placeholder="e.g. Cardiology"
                />

                <FormikControl
                  control="textarea"
                  name="description"
                  label="Description"
                  placeholder="Describe this department..."
                />

                {/* <div className="form-row">
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" rows="3" placeholder="Describe this department..."></textarea>
    </div> */}

                <div className="form-actions">
                  <button type="reset" className="btn-outline">
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!isValid || isSubmitting || !dirty}
                  >
                    Save Department
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  );
};

export default DepartmentForm;
{
  /* <div className="form-row checkbox-row">
              <input type="checkbox" id="isActive" name="isActive" />
              <label htmlFor="isActive">Active</label>
            </div> */
}
