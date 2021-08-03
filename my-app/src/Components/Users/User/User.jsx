import React from 'react'
import s from './User.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'
import { NavLink } from 'react-router-dom'

const User = (props) => {
  const onFollow = (userId) => {
    props.follow(userId)
  }

  const onUnfollow = (userId) => {
    props.unfollow(userId)
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
            disabled={props.followingInProgress.some(
              (id) => id === props.userId
            )}
            onClick={() => {
              onUnfollow(props.userId)
            }}
          >
            Отписаться
          </button>
        ) : (
          <button
            disabled={props.followingInProgress.some(
              (id) => id === props.userId
            )}
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
