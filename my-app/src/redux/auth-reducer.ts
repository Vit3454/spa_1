import { Action } from 'redux'
import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeEnum, ResultCodeForCaptcha } from '../api/api'
import { authAPI } from '../api/authAPI'
import { securityAPI } from '../api/securityAPI'
import { BaseThunkType, InferActionsType } from './store'

const initialState = {
  authUserId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.userData,
      }

    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      }

    default:
      return state
  }
}

export default authReducer

export const actions = {
  setAuthUserData: (
    authUserId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'SET_USER_DATA',
      userData: { authUserId, email, login, isAuth },
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'GET_CAPTCHA_URL_SUCCESS',
      captchaUrl,
    } as const),
}

// thunk

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const res = await authAPI.auth()
  if (res.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = res.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
    const res = await authAPI.login(email, password, rememberMe, captcha)
    if (res.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.setAuthUserData(null, null, null, false))
    }
    if (res.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (res.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      let message = res.messages.length > 0 ? res.messages[0] : 'Some error'
      dispatch(stopSubmit('loginForm', { _error: message }))
    }
  }

export const logout = (): ThunkType => async (dispatch) => {
  const res = await authAPI.logout()
  if (res.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const url = await securityAPI.getCaptcha()
  const captchaUrl = url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

// выводим тип для initialState
type InitialStateType = typeof initialState
// выводим тип для actions
type ActionsType = InferActionsType<typeof actions>
// выводим тип для thunk
type ThunkType = BaseThunkType<ActionsType | FormAction>
