import { stopSubmit } from 'redux-form'
import { usersAPI } from '../api/api'

const SET_USER_DATA = 'AUTH_REDUCER/SET_USER_DATA'

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

export const getAuthUserData = () => async (dispatch) => {
  const response = await usersAPI.auth()
  if (response.resultCode === 0) {
    let { id, email, login } = response.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const login = (login, password, rememberMe) => async (dispatch) => {
  const response = await usersAPI.login(login, password, rememberMe)
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : 'Some error'
    dispatch(stopSubmit('loginForm', { _error: message }))
  }
}

export const logout = () => async (dispatch) => {
  const response = await usersAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}
