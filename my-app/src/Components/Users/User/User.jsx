import React from 'react'
import s from './User.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'
import { NavLink } from 'react-router-dom'
import * as axios from 'axios'

const User = (props) => {
  const onFollow = (userId) => {
    console.log('follow')
    axios
      .post(
        `https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'API-KEY': '9efcb1a5-3bef-4918-96b5-4c336468dfa3',
          },
        }
      )
      .then((response) => {
        if (response.data.resultCode === 0) {
          props.follow(userId)
        }
      })
  }

  const onUnfollow = (userId) => {
    console.log('unfollow')
    axios
      .delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
        withCredentials: true,
        headers: {
          'API-KEY': '9efcb1a5-3bef-4918-96b5-4c336468dfa3',
        },
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          props.unfollow(userId)
        }
      })
  }

  const unfollow = () => {}

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
