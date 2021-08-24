import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../../validators/validators'
import { createField, Input, Textarea } from '../../FormsControl/FormsControl'
import s from './DialogsForm.module.css'

const maxLength30 = maxLength(30)

type OwnPropsType = {}

export type FormDataType = {
  message: string
}

// FormDataTypeKeys служит для контроля name в createField
type FormDataTypeKeys = Extract<keyof FormDataType, string>

const DialogsForm: React.FC<
  InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.dialogs}>
      {createField<FormDataTypeKeys>(
        Input,
        'message',
        [requiredField, maxLength30],
        'Новое сообщение',
        undefined,
        {},
        undefined
      )}
      <div>
        <button>Отправить</button>
      </div>
    </form>
  )
}

const ReduxDialogsForm = reduxForm<FormDataType, OwnPropsType>({
  form: 'dialogsForm',
})(DialogsForm)

export default ReduxDialogsForm
