import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import SearchableInput from './SearchableInput'

const FormikControl = (props) => {
    const {control, ...rest} = props
    switch (control) {
        case 'input':    return <Input {...rest}/>
        case 'textarea': return <Textarea {...rest} />
        case 'select':   return <Select {...rest} />   
        case 'search':   return <SearchableInput {...rest} />   
        case 'radio':
        case 'checkbox':
        case 'date':
        default: return null

    }
}

export default FormikControl