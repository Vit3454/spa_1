import { stopSubmit } from 'redux-form'
import { usersAPI } from '../api/api'
import { PhotosType, PostType, UserProfileType } from '../types/types'

const ADD_POST = 'PROFILE_REDUCER/ADD_POST'
const SET_USER_PROFILE = 'PROFILE_REDUCER/SET_USER_PROFILE'
const SET_STATUS = 'PROFILE_REDUCER/SET_STATUS'
const DELETE_POST = 'PROFILE_REDUCER/DELETE_POST'
const SAVE_PHOTO = 'PROFILE_REDUCER/SAVE_PHOTO'

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

type InitialStateType = typeof initialState

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 4,
        message: action.newPostText,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }

    case SAVE_PHOTO:
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

type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  userProfile: UserProfileType
}

export const setUserProfile = (
  userProfile: UserProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  userProfile,
})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}

const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO
  photos: PhotosType
}

const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO,
  photos,
})

// thunk

export const getProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await usersAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    debugger
  }
}

export const savePhoto = (foto: any) => async (dispatch: any) => {
  const response = await usersAPI.savePhoto(foto)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfile =
  (userProfile: UserProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.authUserId
    const response = await usersAPI.saveProfile(userProfile)
    if (response.data.resultCode === 0) {
      dispatch(getProfile(userId))
    } else {
      // let message =
      //   response.data.messages.length > 0
      //     ? response.data.messages[0]
      //     : 'Some error'
      // dispatch(stopSubmit('loginForm', { _error: response.data.messages[0] }))

      // ошибка для конкретного филда
      // dispatch(
      //   stopSubmit('userInfoForm', {
      //     contacts: { facebook: response.data.messages[0] },
      //   })
      // )

      dispatch(
        stopSubmit('userInfoForm', { _error: response.data.messages[0] })
      )
      return Promise.reject(response.data.messages[0])
    }
  }