import React from 'react'

const TextErrorMsg = ({children}) => {
  return (
    <div style={{ color: 'red' }}>
        {children}
    </div>
  )
}

export default TextErrorMsg