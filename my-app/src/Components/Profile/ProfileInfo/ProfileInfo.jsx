import React from 'react'
import s from './ProfileInfo.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'

const ProfileInfo = (props) => {
  return (
    <div className={osc.component + ' ' + s.profileInfo}>
      <div className={s.ava}>
        <img src={avatar} alt={'avatar'} />
      </div>
      <div className={s.discription}>user name, status</div>
    </div>
  )
}

export default ProfileInfo
