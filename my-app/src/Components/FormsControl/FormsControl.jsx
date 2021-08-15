import React from 'react'
import { Field } from 'redux-form'
import s from './FormsControl.module.css'

const FormControl = ({ input, meta: { touched, error }, children }) => {
  const hasError = touched && error
  return (
    <div className={s.input + ' ' + (hasError ? s.error : null)}>
      <div>{children}</div>
      {hasError ? <span>{error}</span> : null}
    </div>
  )
}

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export const createField = (
  component,
  name,
  validate = [],
  placeholder = '',
  type = '',
  props = {},
  text = ''
) => (
  <div>
    <Field
      component={component}
      name={name}
      validate={validate}
      placeholder={placeholder}
      type={type}
      {...props}
    />
    {text}
  </div>
)
