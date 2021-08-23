import { GetItemsType, instance } from './api'

export const usersAPI = {
  getUsers: (pageSize: number, currentPage: number) => {
    return instance
      .get<GetItemsType>(`users?count=${pageSize}&page=${currentPage}`)
      .then((res) => {
        return res.data
      })
  },
}
