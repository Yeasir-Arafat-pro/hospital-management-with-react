import React from 'react'
import { Field, ErrorMessage } from "formik";
import TextErrorMsg from './TextErrorMsg';
import Select from "react-select";

const SearchableInput = (props) => {

 const {name, label, options, ...rest} = props
   return (
     <div className="form-row">
       <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form, meta }) => (
          <Select
            className="basic-single"
            classNamePrefix="select"
            inputId={name}
            placeholder={`Select ${label}`}
            options={options}
            name={field.name}
            value={options.find((o) => o.value === field.value)}
            onChange={(o) =>
              form.setFieldValue(field.name, o ? o.value : "")
            }
            onBlur={field.onBlur}




            
            styles={{
    control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      borderColor: "var(--muted)",
      borderRadius: "4px",
      minHeight: "unset",
      fontSize: "1rem",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(30, 58, 138, 0.2)" : "none",
      "&:hover": { borderColor: "var(--primary)" },
      padding: "0.0rem 0.75rem"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
        ? "#f0f0f0"
        : "#fff",
      color: state.isSelected ? "#fff" : "#222",
      fontSize: "1rem"
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text)"
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "var(--muted)"
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none"
    })
  }}
            {...rest}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={TextErrorMsg} />
    </div>
  )
}

export default SearchableInput

