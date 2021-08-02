const SET_USER_DATA = 'SET_USER_DATA'

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
        isAuth: true,
      }
    default:
      return state
  }
}

export default authReducer

export const setAuthUserData = (authUserId, email, login) => ({
  type: SET_USER_DATA,
  userData: { authUserId, email, login },
})