import React from 'react'
import { reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../../validators/validators'
import { createField, Input, Textarea } from '../../FormsControl/FormsControl'
import s from './DialogsForm.module.css'

const maxLength10 = maxLength(10)

const DialogsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.dialogs}>
      {createField(
        Input,
        'message',
        [requiredField, maxLength10],
        'Новое сообщение'
      )}
      <div>
        <button>Отправить</button>
      </div>
    </form>
  )
}

const ReduxDialogsForm = reduxForm({ form: 'dialogsForm' })(DialogsForm)

export default ReduxDialogsForm
