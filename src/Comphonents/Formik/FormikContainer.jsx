import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";



const FormikContainer = () => {
  const options = [
    { key: "Option Red", value: "red" },
    { key: "Option Green", value: "green" },
    { key: "Option Blue", value: "blue" },
  ];

  const initialValues = {
    name: "",
    description: "",
    colour: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    description: Yup.string().required("Description is required"),
    colour: Yup.string().required("Colour is required"),
  });

  const onSubmit = (val, submitProps) => {
    
    console.log(val);
    submitProps.setSubmitting(false)
  };

  return (
    <>
      <section className="form-container">
        <h2>Department Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log('formik ',formik);
            const {isValid, isSubmitting, dirty} = formik
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

                <FormikControl
                  control="select"
                  name="colour"
                  label="Choose Colour"
                  options={options}
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

export default FormikContainer;
{
  /* <div className="form-row checkbox-row">
              <input type="checkbox" id="isActive" name="isActive" />
              <label htmlFor="isActive">Active</label>
            </div> */
}
