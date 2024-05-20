import React from 'react'

const FormRow = ({type,id,name}) => {
  return (
    <div>
        <label htmlFor={id}>{name}</label><br/>
        <input type={type} name={name} id={id}/>
    </div>
  )
}

export default FormRow
