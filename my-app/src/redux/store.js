import { combineReducers, createStore } from 'redux'
import dialogsReducers from './dialogs-reducer'
import profileReducer from './profile-reducer'
import testPageReducer from './testPage-reducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducers,
  testPage: testPageReducer,
})

let store = createStore(reducers)

export default store

window.store = store
