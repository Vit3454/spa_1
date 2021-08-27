import React, { useState } from 'react'
import s from './ProfileInfo.module.css'
import osc from '../../../App.module.css'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import MainPhoto from './MainPhoto/MainPhoto'
import UserInfo from './UserInfo/UserInfo'
import UserInfoEditMode from './UserInfoEditMode/UserInfoEditMode'
import { UserProfileType } from '../../../types/types'
import { saveProfile } from '../../../redux/profile-reducer'

type PropsType = {
  userProfile: UserProfileType | null
  status: string | null
  isOwner: boolean
  updateStatus: (newStatus: string | null) => void
  savePhoto: (foto: File) => void
  saveProfile: (profile: UserProfileType) => void
}

const ProfileInfo: React.FC<PropsType> = ({
  userProfile,
  status,
  isOwner,
  updateStatus,
  savePhoto,
}) => {
  let [editMode, setEditMode] = useState(false)

  if (!userProfile) return <Preloader />
  return (
    <div className={osc.component + ' ' + s.profileInfo}>
      <MainPhoto
        userProfile={userProfile}
        isOwner={isOwner}
        savePhoto={savePhoto}
      />
      <ProfileStatus status={status} updateStatus={updateStatus} />
      {isOwner ? (
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
          userProfile={userProfile}
          // @ts-ignore
          saveProfile={saveProfile}
          setEditMode={setEditMode}
          // initialValues={userProfile}
        />
      ) : (
        <UserInfo userProfile={userProfile} />
      )}
    </div>
  )
}

export default ProfileInfo
