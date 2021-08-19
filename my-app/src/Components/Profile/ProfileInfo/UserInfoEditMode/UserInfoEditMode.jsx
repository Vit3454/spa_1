import React from 'react'
import s from './UserInfoEditMode.module.css'
import osc from '../../../../App.module.css'
import { reduxForm } from 'redux-form'
import { createField, Input } from '../../../FormsControl/FormsControl'
import { maxLength } from '../../../../validators/validators'

const maxLength10 = maxLength(10)

const UserInfoForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.userInfoForm}>
      <div>
        <button>Сохранить</button>
      </div>

      {props.error ? <div className={s.overallError}>{props.error}</div> : null}

      <b>Полное имя: </b>
      {createField(Input, 'fullName', [maxLength10], 'Полное имя')}

      <b>Ищу работу: </b>
      {createField(
        Input,
        'lookingForAJob',
        [],
        '',
        'checkbox',
        {},
        'Looking for a job'
      )}

      <b>Обо мне: </b>
      {createField(Input, 'aboutMe', [maxLength10], 'Обо мне')}

      <b>Проф навыки: </b>
      {createField(
        Input,
        'lookingForAJobDescription',
        [maxLength10],
        'Проф навыки'
      )}

      <div>
        <b>Contacts: </b>
        {Object.keys(props.userProfile.contacts).map((key) => {
          return (
            <div key={key}>
              <b>{key}: </b>
              {createField(Input, 'contacts.' + key, [], key)}
            </div>
          )
        })}
      </div>
    </form>
  )
}

const ReduxUserInfoForm = reduxForm({ form: 'userInfoForm' })(UserInfoForm)

const UserInfoEditMode = (props) => {
  const onSave = (formData) => {
    props.saveProfile(formData).then(() => {
      props.setEditMode(false)
    })
  }

  return (
    <div className={osc.component + ' ' + s.userInfo}>
      <ReduxUserInfoForm onSubmit={onSave} {...props} />
    </div>
  )
}

export default UserInfoEditMode
