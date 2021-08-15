import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../Components/utils/object-helper'

const SET_USERS = 'USERS_REDUCER/SET_USERS'
const FOLLOW = 'USERS_REDUCER/FOLLOW'
const UNFOLLOW = 'USERS_REDUCER/UNFOLLOW'
const SET_TOTAL_USERS_COUNT = 'USERS_REDUCER/SET_TOTAL_USERS_COUNT'
const SET_CURRENT_PAGE = 'USERS_REDUCER/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'USERS_REDUCER/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS =
  'USERS_REDUCER/TOGGLE_FOLLOWING_IN_PROGRESS'

const initialState = {
  users: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      }

    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, 'id', action.userId, {
          followed: true,
        }),

        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true }
        //   }
        //   return u
        // }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, 'id', action.userId, {
          followed: false,
        }),

        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: false }
        //   }
        //   return u
        // }),
      }

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.val,
      }

    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      }

    default:
      return state
  }
}

export default usersReducer

const setUsers = (users) => ({ type: SET_USERS, users })
const followSuccess = (userId) => ({ type: FOLLOW, userId })
const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
const setTotalUserCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
})
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
})
export const toggleIsFetching = (val) => ({ type: TOGGLE_IS_FETCHING, val })
export const toggleFollowingInProgress = (isFetching, userId) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
})

// thunk

export const getUsers = (pageSize, currentPage) => async (dispatch) => {
  dispatch(setCurrentPage(currentPage))
  dispatch(toggleIsFetching(true))
  const data = await usersAPI.getUsers(pageSize, currentPage)
  dispatch(setUsers(data.items))
  dispatch(toggleIsFetching(false))
  dispatch(setTotalUserCount(data.totalCount))
}

const followUnfollow = async (dispatch, userId, apiMehod, actionCreator) => {
  dispatch(toggleFollowingInProgress(true, userId))
  const response = await apiMehod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingInProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.follow, followSuccess)
}

export const unfollow = (userId) => async (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.unfollow, unfollowSuccess)
}
