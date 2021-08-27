import React from 'react'
import s from './Profile.module.css'
import os from '../../App.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from './Posts/PostContainer'
import { UserProfileType } from '../../types/types'

type PropsType = {
  isOwner: boolean
  userProfile: UserProfileType | null
  status: string | null
  isAuth: boolean
  updateStatus: (newStatus: string | null) => void
  savePhoto: (foto: File) => void
  saveProfile: (profile: UserProfileType) => void
}

const Profile: React.FC<PropsType> = ({
  isOwner,
  userProfile,
  status,
  updateStatus,
  savePhoto,
  saveProfile,
}) => {
  return (
    <div className={s.profile + ' ' + os.block}>
      <ProfileInfo
        isOwner={isOwner}
        userProfile={userProfile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      <PostsContainer />
    </div>
  )
}

export default Profile
