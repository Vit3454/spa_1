import React from 'react'
import s from './ProfileInfo.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileStatusWithcHooks from './ProfileStatus/ProfileStatusWithHooks'

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
      {/* <ProfileStatus status={props.status} updateStatus={props.updateStatus} /> */}
      <ProfileStatusWithcHooks
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <div className={s.discription}>
        <div>{props.userProfile.fullName}</div>
        <div>{props.userProfile.aboutMe}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
