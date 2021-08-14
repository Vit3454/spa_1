import React, { useEffect, useState } from 'react'
import osc from '../../../../App.module.css'
import s from './ProfileStatus.module.css'

const ProfileStatusWithcHooks = (props) => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)
  // принимает первым параметром функцию, которая выплнятся после отрисовки
  // зависимость, каждый раз, когда придет новый статус - будет срабатывать useEffect
  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  const deActivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  return (
    <div className={osc.component + ' ' + s.ProfileStatus}>
      {editMode ? (
        <input
          value={status}
          onChange={onStatusChange}
          autoFocus={true}
          onBlur={deActivateEditMode}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.status}</span>
      )}
    </div>
  )
}

export default ProfileStatusWithcHooks
