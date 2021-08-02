import React from 'react'
import s from './Users.module.css'
import os from '../../App.module.css'
import User from './User/User'

const Users = (props) => {
  let users = props.users.map((u) => (
    <User
      key={u.id}
      userId={u.id}
      photo={u.photos.small}
      name={u.name}
      status={u.status}
      followed={u.followed}
      follow={props.follow}
      unfollow={props.unfollow}
      toggleFollowingInProgress={props.toggleFollowingInProgress}
      followingInProgress={props.followingInProgress}
    />
  ))

  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize)

  const pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  return (
    <div className={os.block + ' ' + s.users}>
      {pages.map((p) => (
        <button
          className={p === props.currentPage ? s.active : undefined}
          key={p}
          onClick={() => {
            props.onPageChaged(p)
          }}
        >
          {p}
        </button>
      ))}
      {users}
    </div>
  )
}

export default Users
