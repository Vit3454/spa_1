import React from 'react'
import s from './UserInfo.module.css'
import osc from '../../../../App.module.css'

const UserInfo = (props) => {
  return (
    <div className={osc.component + ' ' + s.userInfo}>
      <div>
        <b>Full name: </b>
        {props.userProfile.fullName}
      </div>

      <div>
        <b>Looking for a job: </b>
        {props.userProfile.lookingForAJob ? 'yes' : 'no'}
      </div>

      <div>
        <b>Профессиональные навыки: </b>
        {props.userProfile.lookingForAJobDescription}
      </div>

      <div>
        <b>About me: </b>
        {props.userProfile.aboutMe}
      </div>
      <div className={s.contacts}>
        <b>Contacts: </b>
        {Object.keys(props.userProfile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.userProfile.contacts[key]}
          />
        ))}
      </div>
    </div>
  )
}

export default UserInfo

const Contact = (props) => {
  return (
    <div className={s.contact}>
      <b>{props.contactTitle}</b>: {props.contactValue}
    </div>
  )
}
