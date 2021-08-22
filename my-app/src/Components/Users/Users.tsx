import React from 'react'
import s from './Users.module.css'
import os from '../../App.module.css'
import User from './User/User'
import Paginator from './Paginator/Paginator'
import { UserType } from '../../types/types'

type PropsType = {
  users: Array<UserType>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  // toggleFollowingInProgress: any
  followingInProgress: Array<number>
  totalUsersCount: number
  pageSize: number
  portionSize: number
  currentPage: number
  onPageChaged: (pageNumber: number) => void
}

const Users: React.FC<PropsType> = ({
  users,
  follow,
  unfollow,
  // toggleFollowingInProgress,
  followingInProgress,
  totalUsersCount,
  pageSize,
  portionSize,
  currentPage,
  onPageChaged,
}) => {
  let arrayUsers = users.map((u) => (
    <User
      key={u.id}
      userId={u.id}
      photo={u.photos.small}
      name={u.name}
      status={u.status}
      followed={u.followed}
      follow={follow}
      unfollow={unfollow}
      // toggleFollowingInProgress={toggleFollowingInProgress}
      followingInProgress={followingInProgress}
    />
  ))

  return (
    <div className={os.block + ' ' + s.users}>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        portionSize={portionSize}
        currentPage={currentPage}
        onPageChaged={onPageChaged}
      />
      {arrayUsers}
    </div>
  )
}

export default Users
