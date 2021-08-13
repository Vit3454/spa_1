import { stopSubmit } from 'redux-form'
import { usersAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
  authUserId: null,
  email: null,
  login: null,
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.userData,
      }
    default:
      return state
  }
}

export default authReducer

export const setAuthUserData = (authUserId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  userData: { authUserId, email, login, isAuth },
})

// thunk

export const getAuthUserData = () => (dispatch) => {
  return usersAPI.auth().then((response) => {
    if (response.resultCode === 0) {
      let { id, email, login } = response.data
      dispatch(setAuthUserData(id, email, login, true))
    }
  })
}

export const login = (login, password, rememberMe) => (dispatch) => {
  usersAPI.login(login, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Some error'
      dispatch(stopSubmit('loginForm', { _error: message }))
    }
  })
}

export const logout = () => (dispatch) => {
  usersAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  })
}
