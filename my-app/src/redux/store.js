import { combineReducers, createStore } from 'redux'
import authReducer from './auth-reducer'
import dialogsReducers from './dialogs-reducer'
import profileReducer from './profile-reducer'
import testPageReducer from './testPage-reducer'
import usersReducer from './users-reducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducers,
  usersPage: usersReducer,
  testPage: testPageReducer,
  auth: authReducer,
})

let store = createStore(reducers)

export default store

window.store = store
