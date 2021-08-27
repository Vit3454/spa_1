import React, { ChangeEvent, useEffect, useState } from 'react'
import osc from '../../../../App.module.css'
import s from './ProfileStatus.module.css'

type PropsType = {
  status: string | null
  updateStatus: (newStatus: string | null) => void
}

const ProfileStatusWithcHooks: React.FC<PropsType> = ({
  status,
  updateStatus,
}) => {
  let [editMode, setEditMode] = useState(false)
  let [localStatus, setStatus] = useState(status)
  // принимает первым параметром функцию, которая выплнятся после отрисовки
  // зависимость, каждый раз, когда придет новый статус - будет срабатывать useEffect
  useEffect(() => {
    setStatus(status)
  }, [status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  const deActivateEditMode = () => {
    setEditMode(false)
    updateStatus(localStatus)
  }

  return (
    <div className={osc.component + ' ' + s.ProfileStatus}>
      {editMode ? (
        <input
          value={localStatus as string}
          onChange={onStatusChange}
          autoFocus={true}
          onBlur={deActivateEditMode}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{status}</span>
      )}
    </div>
  )
}

export default ProfileStatusWithcHooks
