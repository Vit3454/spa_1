import { stopSubmit } from 'redux-form'
import { usersAPI } from '../api/api'

const SET_USER_DATA = 'AUTH_REDUCER/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'AUTH_REDUCER/GET_CAPTCHA_URL_SUCCESS'

const initialState = {
  authUserId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.userData,
      }

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      }

    default:
      return state
  }
}

export default authReducer

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  userData: {
    authUserId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
  }
}

export const setAuthUserData = (
  authUserId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  userData: { authUserId, email, login, isAuth },
})

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  captchaUrl: string
}

const getCaptchaUrlSuccess = (
  captchaUrl: string
): getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  captchaUrl,
})

// thunk

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await usersAPI.auth()
  if (response.resultCode === 0) {
    let { id, email, login } = response.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const login =
  (login: string, password: string, rememberMe: boolean, captcha: string) =>
  async (dispatch: any) => {
    const response = await usersAPI.login(login, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
      }
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Some error'
      dispatch(stopSubmit('loginForm', { _error: message }))
    }
  }

export const logout = () => async (dispatch: any) => {
  const response = await usersAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await usersAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}
