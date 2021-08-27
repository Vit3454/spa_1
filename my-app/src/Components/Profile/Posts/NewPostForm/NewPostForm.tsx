import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../../../validators/validators'
import { createField, Textarea } from '../../../FormsControl/FormsControl'
import s from './NewPostForm.module.css'

const maxLength10 = maxLength(10)

type FormDataType = {
  message: string
}

type FormDataTypeKeys = keyof FormDataType

const NewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      {createField<FormDataTypeKeys>(
        Textarea,
        'message',
        [requiredField, maxLength10],
        'message',
        undefined,
        {},
        undefined
      )}
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const ReduxNewPostForm = reduxForm<FormDataType>({ form: 'newPostForm' })(
  NewPostForm
)

export default ReduxNewPostForm
