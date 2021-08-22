import axios from 'axios'
import { UserProfileType } from '../types/types'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9efcb1a5-3bef-4918-96b5-4c336468dfa3',
  },
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

type AuthResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodeEnum | ResultCodeForCaptcha
  messages: Array<string>
}

export const usersAPI = {
  auth: () => {
    return instance.get<AuthResponseType>(`auth/me`).then((res) => res.data)
  },

  getUsers: (pageSize: number, currentPage: number) => {
    return instance
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => {
        return response.data
      })
  },

  getProfile: (userId: number) => {
    return instance.get(`profile/${userId}`)
  },

  follow: (userId: number) => {
    return instance.post(`follow/${userId}`)
  },

  unfollow: (userId: number) => {
    return instance.delete(`follow/${userId}`)
  },

  getStatus: (userId: number) => {
    return instance.get(`profile/status/${userId}`)
  },

  updateStatus: (status: string) => {
    return instance.put(`profile/status`, {
      status: status,
    })
  },

  login: (
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) => {
    return instance
      .post<LoginResponseType>('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },

  logout: () => {
    return instance.delete('auth/login')
  },

  savePhoto: (fotoFile: any) => {
    const formData = new FormData()
    formData.append('image', fotoFile)

    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  saveProfile: (userProfile: UserProfileType) => {
    return instance.put('profile', userProfile)
  },

  getCaptcha: () => {
    return instance.get('security/get-captcha-url')
  },
}
