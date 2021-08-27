import { UserProfileType } from '../types/types'
import { APIResponseType, instance, ResultCodeEnum } from './api'

export const profileAPI = {
  getProfile: (userId: number | null) => {
    return instance
      .get<UserProfileType>(`profile/${userId}`)
      .then((res) => res.data)
  },

  getStatus: (userId: number) => {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((res) => res.data)
  },

  updateStatus: (status: string | null) => {
    return instance
      .put<APIResponseType>(`profile/status`, {
        status: status,
      })
      .then((res) => res.data)
  },

  saveProfile: (userProfile: UserProfileType) => {
    return instance
      .put<APIResponseType>('profile', userProfile)
      .then((res) => res.data)
  },
}
