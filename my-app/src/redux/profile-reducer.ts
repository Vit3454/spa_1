import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeEnum } from '../api/api'
import { imageAPI } from '../api/imageAPI'
import { profileAPI } from '../api/profileAPI'
import { PhotosType, PostType, UserProfileType } from '../types/types'
import { BaseThunkType, InferActionsType } from './store'

const initialState = {
  posts: [
    { id: 0, message: 'Hi there!' },
    { id: 1, message: 'Haw are you?' },
    { id: 2, message: 'Lets go!!!' },
    { id: 3, message: 'rrrrrrr' },
  ] as Array<PostType>,
  userProfile: null as UserProfileType | null,
  status: null as string | null,
}

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      const newPost = {
        id: 4,
        message: action.newPostText,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case 'SET_USER_PROFILE':
      return {
        ...state,
        userProfile: action.userProfile,
      }

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      }

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }

    case 'SAVE_PHOTO':
      return {
        ...state,
        // check type
        userProfile: {
          ...state.userProfile,
          photos: action.photos,
        } as UserProfileType,
      }

    default:
      return state
  }
}

export default profileReducer

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: 'ADD_POST',
      newPostText,
    } as const),

  setUserProfile: (userProfile: UserProfileType) =>
    ({
      type: 'SET_USER_PROFILE',
      userProfile,
    } as const),

  setStatus: (status: string) =>
    ({
      type: 'SET_STATUS',
      status,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: 'DELETE_POST',
      postId,
    } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SAVE_PHOTO',
      photos,
    } as const),
}

// thunk

export const getProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const res = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(res))
  }

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const res = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(res))
  }

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const res = await profileAPI.updateStatus(status)
      if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status))
      }
    } catch (error) {
      debugger
    }
  }

export const savePhoto =
  (foto: File): ThunkType =>
  async (dispatch) => {
    const res = await imageAPI.savePhoto(foto)
    debugger
    if (res.resultCode === ResultCodeEnum.Success) {
      debugger
      dispatch(actions.savePhotoSuccess(res.data.photos))
    }
  }

export const saveProfile =
  (userProfile: UserProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.authUserId
    const res = await profileAPI.saveProfile(userProfile)
    debugger
    if (res.resultCode === ResultCodeEnum.Success) {
      if (userId !== null) {
        dispatch(getProfile(userId))
      } else {
        throw new Error('User id cant`be a null')
      }
    } else {
      // let message =
      //   res.data.messages.length > 0
      //     ? res.data.messages[0]
      //     : 'Some error'
      // dispatch(stopSubmit('loginForm', { _error: res.data.messages[0] }))
      // ошибка для конкретного филда
      // dispatch(
      //   stopSubmit('userInfoForm', {
      //     contacts: { facebook: res.data.messages[0] },
      //   })
      // )
      dispatch(stopSubmit('userInfoForm', { _error: res.messages[0] }))
      return Promise.reject(res.messages[0])
    }
  }

// выводим тип для initialState
type InitialStateType = typeof initialState
// выводим тип для actions
type ActionsType = InferActionsType<typeof actions>
// выводим тип для thunk
type ThunkType = BaseThunkType<ActionsType | FormAction>
