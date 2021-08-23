import {
  instance,
  APIResponseType,
  ResultCodeEnum,
  ResultCodeForCaptcha,
} from './api'

type AuthResponseDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  auth: () => {
    return instance
      .get<APIResponseType<AuthResponseDataType>>(`auth/me`)
      .then((res) => res.data)
  },

  login: (
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) => {
    return instance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodeEnum | ResultCodeForCaptcha
        >
      >('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },

  logout: () => {
    return instance.delete<APIResponseType>('auth/login').then((res) => {
      debugger
      return res.data
    })
  },
}
