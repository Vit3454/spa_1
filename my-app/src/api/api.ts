import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9efcb1a5-3bef-4918-96b5-4c336468dfa3',
  },
})

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

// = {} означает тип - объект
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}
