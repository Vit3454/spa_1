import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9efcb1a5-3bef-4918-96b5-4c336468dfa3',
  },
})

export const usersAPI = {
  auth: () => {
    return instance.get(`auth/me`)
  },

  getUsers: (pageSize, currentPage) => {
    return instance
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => {
        return response.data
      })
  },

  follow: (userId) => {
    return instance.post(`follow/${userId}`)
  },

  unfollow: (userId) => {
    return instance.delete(`follow/${userId}`)
  },
}
