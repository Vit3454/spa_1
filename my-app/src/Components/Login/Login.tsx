import s from './Login.module.css'
import os from '../../App.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, requiredField } from '../../validators/validators'
import { createField, Input } from '../FormsControl/FormsControl'

const maxLength30 = maxLength(30)

type LoginFormOwnPropstype = {
  captchaUrl: string | null
}

export type FormDataType = {
  login: string
  password: string
  rememberMe: boolean
  captcha: string
}

type FormDataTypeKeys = keyof FormDataType

const LoginForm: React.FC<
  InjectedFormProps<FormDataType, LoginFormOwnPropstype> & LoginFormOwnPropstype
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      {createField<FormDataTypeKeys>(
        Input,
        'login',
        [requiredField, maxLength30],
        'Email',
        undefined,
        {},
        undefined
      )}
      {createField<FormDataTypeKeys>(
        Input,
        'password',
        [requiredField, maxLength30],
        'Password',
        'password',
        {},
        undefined
      )}
      {createField<FormDataTypeKeys>(
        Input,
        'rememberMe',
        [],
        '',
        'checkbox',
        {},
        'запомнить меня'
      )}

      {captchaUrl ? <img src={captchaUrl} alt="captcha" /> : null}

      {captchaUrl
        ? createField<FormDataTypeKeys>(
            Input,
            'captcha',
            [],
            'Введите символы',
            undefined,
            {},
            undefined
          )
        : null}

      {error ? <div className={s.overallError}>{error}</div> : null}

      <div>
        <button>Вход</button>
      </div>
    </form>
  )
}

const ReduxLoginForm = reduxForm<FormDataType, LoginFormOwnPropstype>({
  form: 'loginForm',
})(LoginForm)

type LoginType = {
  captchaUrl: string | null
  login: (
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void
}

const Login: React.FC<LoginType> = (props) => {
  const onLogin = (formData: FormDataType) => {
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
