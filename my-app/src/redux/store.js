import { applyMiddleware, combineReducers, createStore } from 'redux'
import authReducer from './auth-reducer'
import dialogsReducers from './dialogs-reducer'
import profileReducer from './profile-reducer'
import testPageReducer from './testPage-reducer'
import usersReducer from './users-reducer'
import ReduxThunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducers,
  usersPage: usersReducer,
  testPage: testPageReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
})

let store = createStore(reducers, applyMiddleware(ReduxThunk))

export default store

window.store = store
