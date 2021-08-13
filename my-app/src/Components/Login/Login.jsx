import React from 'react'
import s from './Login.module.css'
import os from '../../App.module.css'
import { reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../validators/validators'
import { createField, Input } from '../FormsControl/FormsControl'

const maxLength10 = maxLength(10)

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      {createField(Input, 'login', [requiredField, maxLength10], 'Email')}
      {createField(Input, 'password', [requiredField, maxLength10], 'Password')}
      <div>
        <button>Вход</button>
      </div>
    </form>
  )
}

const ReduxLoginForm = reduxForm({ form: 'loginForm' })(LoginForm)

const Login = (props) => {
  const onLogin = (formData) => {
    console.log(formData)
  }

  return (
    <div className={os.block + ' ' + s.login}>
      <ReduxLoginForm onSubmit={onLogin} />
    </div>
  )
}

export default Login
