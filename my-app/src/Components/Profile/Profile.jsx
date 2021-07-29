import React from 'react'
import s from './Profile.module.css'
import os from '../../App.module.css'
import Posts from './Posts/Posts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div className={s.profile + ' ' + os.block}>
      <ProfileInfo />
      <Posts
        posts={props.posts}
        newPostText={props.newPostText}
        updateNewPostText={props.updateNewPostText}
        addPost={props.addPost}
      />
    </div>
  )
}

export default Profile
