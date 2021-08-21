import { getAuthUserData } from './auth-reducer'

const SET_INITIALIZED = 'APP_REDUCER/SET_INITIALIZED'

type InitialStateType = {
  initialized: boolean
}

const initialState: InitialStateType = {
  initialized: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type SetInitializedActionType = {
  type: typeof SET_INITIALIZED
}

const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
})

// thunk

export const initialize = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => {
    dispatch(setInitialized())
  })
}
