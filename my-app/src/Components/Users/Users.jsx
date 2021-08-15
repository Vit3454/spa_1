import React from 'react'
import s from './Users.module.css'
import os from '../../App.module.css'
import User from './User/User'
import Paginator from './Paginator/Paginator'

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

  return (
    <div className={os.block + ' ' + s.users}>
      <Paginator {...props} />
      {users}
    </div>
  )
}

export default Users
