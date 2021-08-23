import { instance, APIResponseType } from './api'

export const followAPI = {
  follow: (userId: number) => {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then((res) => res.data)
  },

  unfollow: (userId: number) => {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then((res) => res.data)
  },
}
