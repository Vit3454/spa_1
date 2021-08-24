import { getAuthUserData } from './auth-reducer'
import { InferActionsType } from './store'

const initialState = {
  initialized: false,
}

type InitialStateType = typeof initialState
// выводим типы экшенов
type ActionsType = InferActionsType<typeof actions>

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

export default appReducer

const actions = {
  setInitialized: () =>
    ({
      type: 'SET_INITIALIZED',
    } as const),
}

// thunk

export const initialize = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => {
    dispatch(actions.setInitialized())
  })
}
