import React from 'react'
import s from './User.module.css'
import osc from '../../../App.module.css'
import avatar from '../../../images/avatar.png'
import { NavLink } from 'react-router-dom'

type PropsType = {
  userId: number
  photo: string
  name: string
  status: string
  followingInProgress: Array<number>
  followed: boolean

  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({
  follow,
  unfollow,
  userId,
  photo,
  name,
  status,
  followingInProgress,
  followed,
}) => {
  const onFollow = (userId: number) => {
    follow(userId)
  }

  const onUnfollow = (userId: number) => {
    unfollow(userId)
  }

  return (
    <div className={osc.component + ' ' + s.user}>
      <div>
        <NavLink to={'/profile/' + userId}>
          {photo ? (
            <img src={photo} alt="avatar" />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
        </NavLink>
      </div>
      <div>{name}</div>
      <div>{status}</div>
      <div>
        {followed ? (
          <button
            disabled={followingInProgress.some((id) => id === userId)}
            onClick={() => {
              onUnfollow(userId)
            }}
          >
            Отписаться
          </button>
        ) : (
          <button
            disabled={followingInProgress.some((id) => id === userId)}
            onClick={() => {
              onFollow(userId)
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
