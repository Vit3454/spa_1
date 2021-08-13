import React from 'react'
import s from './Login.module.css'
import os from '../../App.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../validators/validators'
import { createField, Input } from '../FormsControl/FormsControl'

const maxLength30 = maxLength(30)

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      {createField(Input, 'login', [requiredField, maxLength30], 'Email')}
      {createField(
        Input,
        'password',
        [requiredField, maxLength30],
        'Password',
        'password'
      )}
      <div>
        <Field component={'input'} name={'rememberMe'} type={'checkbox'} />
      </div>
      {props.error ? <div class={s.overallError}>{props.error}</div> : null}

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
    props.login(formData.login, formData.password, formData.rememberMe)
  }

  return (
    <div className={os.block + ' ' + s.login}>
      <ReduxLoginForm onSubmit={onLogin} />
    </div>
  )
}

export default Login
