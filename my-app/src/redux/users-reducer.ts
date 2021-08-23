import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../Components/utils/object-helper'
import { UserType } from '../types/types'
import { AppStateType, InferActionsType } from './store'

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
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      }

    case 'FOLLOW':
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

    case 'UNFOLLOW':
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

    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      }

    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.val,
      }

    case 'TOGGLE_FOLLOWING_IN_PROGRESS':
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

type ActionsType = InferActionsType<typeof actions>

export const actions = {
  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  followSuccess: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  setTotalUserCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  toggleIsFetching: (val: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      val,
    } as const),

  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'TOGGLE_FOLLOWING_IN_PROGRESS',
      isFetching,
      userId,
    } as const),
}

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
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.toggleIsFetching(true))
    const data = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setTotalUserCount(data.totalCount))
  }

const followUnfollow = async (
  dispatch: DispatchType,
  userId: number,
  apiMehod: any,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(actions.toggleFollowingInProgress(true, userId))
  const response = await apiMehod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.follow, actions.followSuccess)
  }

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.unfollow, actions.unfollowSuccess)
  }
