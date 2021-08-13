import { usersAPI } from '../api/api'

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

const initialState = {
  posts: [
    { id: 0, message: 'Hi there!' },
    { id: 1, message: 'Haw are you?' },
    { id: 2, message: 'Lets go!!!' },
    { id: 3, message: 'rrrrrrr' },
  ],
  userProfile: null,
  status: null,
}

const profileReducer = (state = initialState, action) => {
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

// thunk

export const getProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data))
  })
}

export const getStatus = (userId) => (dispatch) => {
  usersAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data))
  })
}

export const updateStatus = (status) => (dispatch) => {
  usersAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  })
}
