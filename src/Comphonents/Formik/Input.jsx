import React from 'react'
import { Field, ErrorMessage } from "formik";
import TextErrorMsg from './TextErrorMsg';

const Input = (props) => {
    const {name, label, ...rest} = props
  return (
    <div className="form-row">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextErrorMsg}/> 
    </div>
  )
}

export default Input