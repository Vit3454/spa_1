import React from 'react'
import { reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../../../validators/validators'
import { createField, Textarea } from '../../../FormsControl/FormsControl'
import s from './NewPostForm.module.css'

const maxLength10 = maxLength(10)

const NewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      {createField(Textarea, 'message', [requiredField, maxLength10])}
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const ReduxNewPostForm = reduxForm({ form: 'newPostForm' })(NewPostForm)

export default ReduxNewPostForm
