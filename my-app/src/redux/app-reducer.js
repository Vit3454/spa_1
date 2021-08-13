import { getAuthUserData } from './auth-reducer'

const SET_INITIALIZED = 'APP_REDUCER/SET_INITIALIZED'

const initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

export default appReducer

const setInitialized = () => ({
  type: SET_INITIALIZED,
})

// thunk

export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => {
    dispatch(setInitialized())
  })
}
