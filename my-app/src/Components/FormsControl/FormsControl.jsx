import React from 'react'
import { Field } from 'redux-form'
import s from './FormsControl.module.css'

export const Input = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error
  return (
    <div className={s.input + ' ' + (error ? s.error : null)}>
      <div>
        <input {...input} {...props} />
      </div>
      {error ? <span>{meta.error}</span> : null}
    </div>
  )
}

export const Textarea = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error
  return (
    <div className={s.input + ' ' + (error ? s.error : null)}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {error ? <span>{meta.error}</span> : null}
    </div>
  )
}

export const createField = (
  component,
  name,
  validate = [],
  placeholder = ''
) => (
  <div>
    <Field
      component={component}
      name={name}
      validate={validate}
      placeholder={placeholder}
    />
  </div>
)
