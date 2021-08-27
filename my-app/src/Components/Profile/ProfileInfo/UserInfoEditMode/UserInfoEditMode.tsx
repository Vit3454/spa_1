import React from 'react'
import s from './UserInfoEditMode.module.css'
import osc from '../../../../App.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../../FormsControl/FormsControl'
import { maxLength } from '../../../../validators/validators'
import { UserProfileType } from '../../../../types/types'

const maxLength10 = maxLength(10)

type PropsType = {
  userProfile: UserProfileType
}

type UserInfoFormKeys = keyof UserProfileType

const UserInfoForm: React.FC<
  InjectedFormProps<UserProfileType, PropsType> & PropsType
> = ({ handleSubmit, error, userProfile }) => {
  return (
    <form onSubmit={handleSubmit} className={s.userInfoForm}>
      <div>
        <button>Сохранить</button>
      </div>

      {error ? <div className={s.overallError}>{error}</div> : null}

      <b>Полное имя: </b>
      {createField<UserInfoFormKeys>(
        Input,
        'fullName',
        [maxLength10],
        'Полное имя',
        undefined,
        {},
        undefined
      )}

      <b>Ищу работу: </b>
      {createField<UserInfoFormKeys>(
        Input,
        'lookingForAJob',
        [],
        '',
        'checkbox',
        {},
        'Looking for a job'
      )}

      <b>Обо мне: </b>
      {createField<UserInfoFormKeys>(
        Input,
        'aboutMe',
        [maxLength10],
        'Обо мне',
        'password',
        {},
        undefined
      )}

      <b>Проф навыки: </b>
      {createField<UserInfoFormKeys>(
        Input,
        'lookingForAJobDescription',
        [maxLength10],
        'Проф навыки',
        undefined,
        {},
        undefined
      )}

      <div>
        <b>Contacts: </b>
        {Object.keys(userProfile.contacts).map((key) => {
          return (
            <div key={key}>
              <b>{key}: </b>
              {createField(
                Input,
                'contacts.' + key,
                [],
                key,
                undefined,
                {},
                undefined
              )}
            </div>
          )
        })}
      </div>
    </form>
  )
}

const ReduxUserInfoForm = reduxForm<UserProfileType, PropsType>({
  form: 'userInfoForm',
})(UserInfoForm)

type PropsType2 = {
  userProfile: UserProfileType
  saveProfile: (formData: UserProfileType) => Promise<any>
  initialValues: UserProfileType
  setEditMode: (val: boolean) => void
}

const UserInfoEditMode: React.FC<PropsType2> = ({
  userProfile,
  saveProfile,
  setEditMode,
}) => {
  const onSave = (formData: UserProfileType) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  return (
    <div className={osc.component + ' ' + s.userInfo}>
      <ReduxUserInfoForm userProfile={userProfile} onSubmit={onSave} />
    </div>
  )
}

export default UserInfoEditMode
