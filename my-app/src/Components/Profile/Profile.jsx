import React from 'react'
import s from './Profile.module.css'
import os from '../../App.module.css'
import Posts from './Posts/Posts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = () => {
  return (
    <div className={s.profile + ' ' + os.block}>
      <ProfileInfo />
      <Posts />
    </div>
  )
}

export default Profile
