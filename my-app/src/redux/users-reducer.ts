import { RootStateOrAny } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../Components/utils/object-helper'
import { UserType } from '../types/types'
import { AppStateType } from './store'

const SET_USERS = 'USERS_REDUCER/SET_USERS'
const FOLLOW = 'USERS_REDUCER/FOLLOW'
const UNFOLLOW = 'USERS_REDUCER/UNFOLLOW'
const SET_TOTAL_USERS_COUNT = 'USERS_REDUCER/SET_TOTAL_USERS_COUNT'
const SET_CURRENT_PAGE = 'USERS_REDUCER/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'USERS_REDUCER/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS =
  'USERS_REDUCER/TOGGLE_FOLLOWING_IN_PROGRESS'

const initialState = {
  users: [] as Array<UserType>,
  totalUsersCount: 0,
  pageSize: 10,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  portionSize: 10,
}

type InitialStataType = typeof initialState

const usersReducer = (
  state = initialState,
  action: ActionsType
): InitialStataType => {
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

type ActionsType =
  | GetUsersActionType
  | FollowSuccessActionType
  | UnfollowSuccessActionType
  | SetTotalUsersCountActionType
  | SetCurrentPage
  | ToggleIsFetchingActionType
  | ToggleFollowingInProgressActionType

type GetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}

const setUsers = (users: Array<UserType>): GetUsersActionType => ({
  type: SET_USERS,
  users,
})

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}

const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
})

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}

const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
})

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}

const setTotalUserCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
})

type SetCurrentPage = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
})

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  val: boolean
}

export const toggleIsFetching = (val: boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  val,
})

type ToggleFollowingInProgressActionType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
  isFetching: boolean
  userId: number
}

const toggleFollowingInProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingInProgressActionType => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
})

// thunk

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

// export const getUsers =
//   (pageSize: number, currentPage: number) =>
//   async (dispatch: DispatchType, getState: GetStateType) => {
//     dispatch(setCurrentPage(currentPage))
//     dispatch(toggleIsFetching(true))
//     const data = await usersAPI.getUsers(pageSize, currentPage)
//     dispatch(setUsers(data.items))
//     dispatch(toggleIsFetching(false))
//     dispatch(setTotalUserCount(data.totalCount))
//   }

// другой вариант типизации thunk

export const getUsers =
  (pageSize: number, currentPage: number): ThunkType =>
  async (dispatch, getState) => {
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(setUsers(data.items))
    dispatch(toggleIsFetching(false))
    dispatch(setTotalUserCount(data.totalCount))
  }

const followUnfollow = async (
  dispatch: DispatchType,
  userId: number,
  apiMehod: any,
  actionCreator: (
    userId: number
  ) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
  dispatch(toggleFollowingInProgress(true, userId))
  const response = await apiMehod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingInProgress(false, userId))
}

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.follow, followSuccess)
  }

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.unfollow, unfollowSuccess)
  }
