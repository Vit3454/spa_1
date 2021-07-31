import React from 'react'
import s from './User.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'

const User = (props) => {
  return (
    <div className={osc.component + ' ' + s.user}>
      <div>
        {props.photo ? (
          <img src={props.photo} alt="avatar" />
        ) : (
          <img src={avatar} alt="avatar" />
        )}
      </div>
      <div>{props.name}</div>
      <div>{props.status}</div>
      <div>
        {props.followed ? (
          <button
            onClick={() => {
              props.unfollow(props.userId)
            }}
          >
            Отписаться
          </button>
        ) : (
          <button
            onClick={() => {
              props.follow(props.userId)
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
