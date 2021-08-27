import React from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../validators/validators'
import s from './FormsControl.module.css'

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error
  return (
    <div className={s.input + ' ' + (hasError ? s.error : null)}>
      <div>{children}</div>
      {hasError ? <span>{error}</span> : null}
    </div>
  )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export function createField<FormKeysType extends string>(
  component: React.FC<WrappedFieldProps>,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  placeholder: string | undefined,
  type: string | undefined,
  props = {},
  text: string | undefined
) {
  return (
    <div>
      <Field
        component={component}
        name={name}
        validate={validators}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {text}
    </div>
  )
}

// export type GetStringKeys<T> = Extract<keyof T, string>
