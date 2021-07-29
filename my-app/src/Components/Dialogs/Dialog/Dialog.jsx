import React from 'react'
import s from './Dialog.module.css'
import osc from '../../../App.module.css'
import { NavLink } from 'react-router-dom'

const Dialog = (props) => {
  return (
    <div className={osc.component + ' ' + s.dialog}>
      <NavLink to={`/dialogs/${props.id}`} activeClassName={s.active}>
        {props.name}
      </NavLink>
    </div>
  )
}

export default Dialog
