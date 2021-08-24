import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import authReducer from './auth-reducer'
import dialogsReducers from './dialogs-reducer'
import profileReducer from './profile-reducer'
import testPageReducer from './testPage-reducer'
import usersReducer from './users-reducer'
import ReduxThunk, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducers,
  usersPage: usersReducer,
  testPage: testPageReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
})

type RootReducersType = typeof rootReducer

export type AppStateType = ReturnType<RootReducersType>

// key - actionName in object
// значение - с помощью infer определяем тип
export type InferActionsType<T> = T extends {
  [keys: string]: (...arg: any[]) => infer U
}
  ? U
  : never

// type for thunk
// A actionType
// R возвращаемое значение
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>

let store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store
// @ts-ignore
window.store = store
