import React from 'react'
import s from './Profile.module.css'
import os from '../../App.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from './Posts/PostContainer'

const Profile = (props) => {
  return (
    <div className={s.profile + ' ' + os.block}>
      <ProfileInfo
        isOwner={props.isOwner}
        userProfile={props.userProfile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <PostsContainer />
    </div>
  )
}

export default Profile
