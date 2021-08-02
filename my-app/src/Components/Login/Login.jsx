import React from 'react'
import s from './Login.module.css'
import os from '../../App.module.css'

const Login = (props) => {
  return (
    <div className={os.block + ' ' + s.login}>
      <h1>Авторизация</h1>
      <div>
        <input type="password" />
      </div>
    </div>
  )
}

export default Login
