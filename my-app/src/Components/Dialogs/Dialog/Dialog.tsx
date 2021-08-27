import React from 'react'
import s from './Dialog.module.css'
import osc from '../../../App.module.css'
import { NavLink } from 'react-router-dom'

type DialogPropsType = {
  id: number
  name: string
}

const Dialog: React.FC<DialogPropsType> = ({ id, name }) => {
  return (
    <div className={osc.component + ' ' + s.dialog}>
      <NavLink to={`/dialogs/${id}`} activeClassName={s.active}>
        {name}
      </NavLink>
    </div>
  )
}

export default Dialog
