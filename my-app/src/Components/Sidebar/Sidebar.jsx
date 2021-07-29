import React from 'react'
import s from './Sidebar.module.css'
import os from '../../App.module.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className={s.sideBar + ' ' + os.block}>
      <div>
        <NavLink to={'/profile'} activeClassName={s.active}>
          Профайл
        </NavLink>
      </div>
      <div>
        <NavLink to={'/dialogs'} activeClassName={s.active}>
          Сообщения
        </NavLink>
      </div>
      <div>
        <NavLink to={'/testPage'} activeClassName={s.active}>
          Тест стр
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
