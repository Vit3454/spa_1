import React from 'react'
import s from './User.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'
import { NavLink } from 'react-router-dom'
import { usersAPI } from '../../../api/api'

const User = (props) => {
  const onFollow = (userId) => {
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        props.follow(userId)
      }
    })
  }

  const onUnfollow = (userId) => {
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        props.unfollow(userId)
      }
    })
  }

  return (
    <div className={osc.component + ' ' + s.user}>
      <div>
        <NavLink to={'/profile/' + props.userId}>
          {props.photo ? (
            <img src={props.photo} alt="avatar" />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
        </NavLink>
      </div>
      <div>{props.name}</div>
      <div>{props.status}</div>
      <div>
        {props.followed ? (
          <button
            onClick={() => {
              onUnfollow(props.userId)
            }}
          >
            Отписаться
          </button>
        ) : (
          <button
            onClick={() => {
              onFollow(props.userId)
            }}
          >
            Подписаться
          </button>
        )}
      </div>
    </div>
  )
}

export default User
