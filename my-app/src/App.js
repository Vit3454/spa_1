import React from 'react'
import s from './App.module.css'
import Profile from './Components/Profile/Profile'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import TestPage from './Components/TestPage/TestPage'
import Dialogs from './Components/Dialogs/Dialogs'
import { Route } from 'react-router-dom'

const App = (props) => {
  return (
    <div className={s.app}>
      <Header />
      <Sidebar />
      <div className={s.content}>
        <Route
          path={'/profile'}
          render={() => (
            <Profile
              posts={props.state.profilePage.posts}
              newPostText={props.state.profilePage.newPostText}
              updateNewPostText={props.updateNewPostText}
              addPost={props.addPost}
            />
          )}
        />

        <Route
          path={'/dialogs'}
          render={() => (
            <Dialogs
              dialogs={props.state.dialogsPage.dialogs}
              messages={props.state.dialogsPage.messages}
              newMessageText={props.state.dialogsPage.newMessageText}
              updateNewMessageText={props.updateNewMessageText}
              addMessage={props.addMessage}
            />
          )}
        />
        <Route path={'/testPage'} component={TestPage} />
      </div>
      <Footer />
    </div>
  )
}

export default App
