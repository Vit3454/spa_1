import React, { Props } from 'react'
import s from './Header.module.css'
import os from '../../App.module.css'
import logoImg from '../../images/logo.png'
import { NavLink } from 'react-router-dom'

type HeaderPropsType = {
  logout: () => void
  login: string | null
  isAuth: boolean
}

const Header: React.FC<HeaderPropsType> = ({ logout, login, isAuth }) => {
  return (
    <div className={s.header + ' ' + os.block}>
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login} - <button onClick={logout}>Выход</button>
          </div>
        ) : (
          <button>Вход</button>
        )}
      </div>
      <div>
        <img src={logoImg} alt={'avatar'} />
      </div>
    </div>
  )
}

export default Header
