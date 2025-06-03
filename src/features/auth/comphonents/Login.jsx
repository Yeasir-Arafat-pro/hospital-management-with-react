import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../Comphonents/Formik/FormikControl";
import { useLoginUserMutation } from "../usersApi";

const Login = () => {

    const [loginUser] = useLoginUserMutation()

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });


  const onSubmit = async (val, submitProps) => {
    
    await loginUser(val)
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
          {({isValid, isSubmitting, dirty}) => {
            return (
              <Form id="department-form" className="grid-form">
                <FormikControl
                  control="input"
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email..."
                />

                <FormikControl
                  control="input"
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password..."
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
                    Submit
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

export default Login;
{
  /* <div className="form-row checkbox-row">
              <input type="checkbox" id="isActive" name="isActive" />
              <label htmlFor="isActive">Active</label>
            </div> */
}
