import React, { useState } from 'react'
import s from './ProfileInfo.module.css'
import osc from '../../../App.module.css'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import MainPhoto from './MainPhoto/MainPhoto'
import UserInfo from './UserInfo/UserInfo'
import UserInfoEditMode from './UserInfoEditMode/UserInfoEditMode'

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false)

  if (!props.userProfile) return <Preloader />
  return (
    <div className={osc.component + ' ' + s.profileInfo}>
      <MainPhoto {...props} />
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      {props.isOwner ? (
        <button
          onClick={() => {
            setEditMode(true)
          }}
        >
          Редактировать
        </button>
      ) : null}
      {editMode ? (
        <UserInfoEditMode
          {...props}
          initialValues={props.userProfile}
          setEditMode={setEditMode}
        />
      ) : (
        <UserInfo {...props} />
      )}
    </div>
  )
}

export default ProfileInfo
