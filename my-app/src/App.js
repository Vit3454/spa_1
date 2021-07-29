import React from 'react'
import s from './App.module.css'
import Profile from './Components/Profile/Profile'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import TestPage from './Components/TestPage/TestPage'
import Dialogs from './Components/Dialogs/Dialogs'
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <Sidebar />
      <div className={s.content}>
        <Route path={'/profile'} component={Profile} />
        <Route path={'/dialogs'} component={Dialogs} />
        <Route path={'/testPage'} component={TestPage} />
      </div>
      <Footer />
    </div>
  )
}

export default App
