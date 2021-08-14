import { createSelector } from 'reselect'

// примитивный селектор
const getUsersSelector = (state) => {
  return state.usersPage.users
}

export const getUsersFromState = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true)
})

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount
}

export const getPageSize = (state) => {
  return state.usersPage.pageSize
}

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress
}
