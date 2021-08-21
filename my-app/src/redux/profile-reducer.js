import { stopSubmit } from 'redux-form'
import { usersAPI } from '../api/api'

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
  ],
  userProfile: null,
  status: null,
  fake: 1,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FAKE':
      return { ...state, fake: state.fake + 1 }
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
        userProfile: { ...state.userProfile, photos: action.photos },
      }

    default:
      return state
  }
}

export default profileReducer

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  userProfile,
})
const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO, photos })

// thunk

export const getProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await usersAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await usersAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    debugger
  }
}

export const savePhoto = (foto) => async (dispatch) => {
  const response = await usersAPI.savePhoto(foto)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfile = (userProfile) => async (dispatch, getState) => {
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

    dispatch(stopSubmit('userInfoForm', { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
  }
}
