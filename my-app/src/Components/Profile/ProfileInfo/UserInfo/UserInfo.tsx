import React from 'react'
import s from './UserInfo.module.css'
import osc from '../../../../App.module.css'
import { ContactsType, UserProfileType } from '../../../../types/types'

type PropsType = {
  userProfile: UserProfileType
}

const UserInfo: React.FC<PropsType> = ({ userProfile }) => {
  return (
    <div className={osc.component + ' ' + s.userInfo}>
      <div>
        <b>Full name: </b>
        {userProfile.fullName}
      </div>

      <div>
        <b>Looking for a job: </b>
        {userProfile.lookingForAJob ? 'yes' : 'no'}
      </div>

      <div>
        <b>Профессиональные навыки: </b>
        {userProfile.lookingForAJobDescription}
      </div>

      <div>
        <b>About me: </b>
        {userProfile.aboutMe}
      </div>
      <div className={s.contacts}>
        <b>Contacts: </b>
        {Object.keys(userProfile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={userProfile.contacts[key as keyof ContactsType]}
          />
        ))}
      </div>
    </div>
  )
}

export default UserInfo

type PropsForContactsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<PropsForContactsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}
