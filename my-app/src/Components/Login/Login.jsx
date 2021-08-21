import React from 'react'
import s from './Login.module.css'
import os from '../../App.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../validators/validators'
import { createField, Input } from '../FormsControl/FormsControl'

const maxLength30 = maxLength(30)

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      {createField(Input, 'login', [requiredField, maxLength30], 'Email')}
      {createField(
        Input,
        'password',
        [requiredField, maxLength30],
        'Password',
        'password'
      )}
      {createField(
        Input,
        'rememberMe',
        [],
        '',
        'checkbox',
        {},
        'запомнить меня'
      )}

      {captchaUrl ? <img src={captchaUrl} alt="captcha" /> : null}

      {captchaUrl ? createField(Input, 'captcha', [], 'Введите символы') : null}

      {error ? <div className={s.overallError}>{error}</div> : null}

      <div>
        <button>Вход</button>
      </div>
    </form>
  )
}

const ReduxLoginForm = reduxForm({ form: 'loginForm' })(LoginForm)

const Login = (props) => {
  const onLogin = (formData) => {
    props.login(
      formData.login,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  return (
    <div className={os.block + ' ' + s.login}>
      <ReduxLoginForm onSubmit={onLogin} captchaUrl={props.captchaUrl} />
    </div>
  )
}

export default Login
