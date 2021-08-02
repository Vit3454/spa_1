import React from 'react'
import s from './Header.module.css'
import os from '../../App.module.css'
import logoImg from '../../images/logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className={s.header + ' ' + os.block}>
      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={'/login'}>Вход</NavLink>}
      </div>
      <div>
        <img src={logoImg} alt={'avatar'} />
      </div>
    </div>
  )
}

export default Header
