import React from 'react'
import { Field, ErrorMessage } from "formik";
import TextErrorMsg from './TextErrorMsg';


const Select = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <div className="form-row">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
          <option value=''>
            Select {label}
          </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextErrorMsg} />
    </div>
  );
};

export default Select;
