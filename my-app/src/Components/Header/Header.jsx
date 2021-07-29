import React from 'react'
import s from './Header.module.css'
import os from '../../App.module.css'
import logoImg from '../../images/logo.png'

const Header = () => {
  return (
    <div className={s.header + ' ' + os.block}>
      <img src={logoImg} alt={'avatar'} />
    </div>
  )
}

export default Header
