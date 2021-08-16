import React from 'react'
import s from './App.module.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import TestPage from './Components/TestPage/TestPage'
import { BrowserRouter, Route } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/Users.container'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import { connect } from 'react-redux'
import LoginContainer from './Components/Login/LoginContainer'
import { initialize } from './redux/app-reducer'
import { Provider } from 'react-redux'
import store from './redux/store'

class App extends React.Component {
  componentDidMount() {
    this.props.initialize()
  }

  render() {
    if (!this.props.initialized) return <div>initialize...</div>
    return (
      <div className={s.app}>
        <HeaderContainer />
        <Sidebar />
        <div className={s.content}>
          <Route path={'/'} exact render={() => <ProfileContainer />} />
          <Route path={'/login'} render={() => <LoginContainer />} />
          <Route
            path={'/profile/:userId?'}
            render={() => <ProfileContainer />}
          />
          <Route path={'/dialogs'} render={() => <DialogsContainer />} />
          <Route path={'/testPage'} render={() => <TestPage />} />
          <Route path={'/users'} render={() => <UsersContainer />} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

const ConnectedApp = connect(mapStateToProps, { initialize })(App)

const AppContainer = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    </BrowserRouter>
  )
}

export default AppContainer
