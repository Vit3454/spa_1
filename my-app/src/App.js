import React from 'react'
import s from './App.module.css'
import Profile from './Components/Profile/Profile'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import TestPage from './Components/TestPage/TestPage'
import { Route } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/Users.container'

const App = (props) => {
  return (
    <div className={s.app}>
      <Header />
      <Sidebar />
      <div className={s.content}>
        <Route path={'/profile'} render={() => <Profile />} />
        <Route path={'/dialogs'} render={() => <DialogsContainer />} />
        <Route path={'/testPage'} render={() => <TestPage />} />
        <Route path={'/users'} render={() => <UsersContainer />} />
      </div>
      <Footer />
    </div>
  )
}

export default App
