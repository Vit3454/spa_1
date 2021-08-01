import React from 'react'
import s from './ProfileInfo.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'
import Preloader from '../../Common/Preloader/Preloader'

const ProfileInfo = (props) => {
  if (!props.userProfile) return <Preloader />
  return (
    <div className={osc.component + ' ' + s.profileInfo}>
      <div className={s.ava}>
        {props.userProfile.photos.large ? (
          <img src={props.userProfile.photos.large} alt={'avatar'} />
        ) : (
          <img src={avatar} alt={'avatar'} />
        )}
      </div>
      <div className={s.discription}>
        <div>{props.userProfile.fullName}</div>
        <div>{props.userProfile.aboutMe}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
