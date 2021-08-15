import { usersAPI } from '../api/api'

const ADD_POST = 'PROFILE_REDUCER/ADD_POST'
const SET_USER_PROFILE = 'PROFILE_REDUCER/SET_USER_PROFILE'
const SET_STATUS = 'PROFILE_REDUCER/SET_STATUS'
const DELETE_POST = 'PROFILE_REDUCER/DELETE_POST'

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
  const response = await usersAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}
