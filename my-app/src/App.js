import React from 'react'
import s from './App.module.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/Users.container'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import { connect } from 'react-redux'
import LoginContainer from './Components/Login/LoginContainer'
import { initialize } from './redux/app-reducer'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Suspense } from 'react'
// import TestPage from './Components/TestPage/TestPage'
const TestPage = React.lazy(() => import('./Components/TestPage/TestPage'))

class App extends React.Component {
  // catchAllUnhandledError = (reason, promise) => {
  //   alert('Some error occured')
  // }

  componentDidMount() {
    this.props.initialize()
    // window.addEventListener('unhandledrejection', this.catchAllUnhandledError)
  }

  // componentWillMount() {
  //   window.removeEventListener(
  //     'unhandledrejection',
  //     this.catchAllUnhandledError
  //   )
  // }

  render() {
    if (!this.props.initialized) return <div>initialize...</div>
    return (
      <div className={s.app}>
        <HeaderContainer />
        <Sidebar />
        <div className={s.content}>
          <Switch>
            <Route path={'/'} exact render={() => <Redirect to="/profile" />} />
            <Route path={'/login'} render={() => <LoginContainer />} />
            <Route
              path={'/profile/:userId?'}
              render={() => <ProfileContainer />}
            />
            <Route path={'/dialogs'} render={() => <DialogsContainer />} />
            <Route
              path={'/testPage'}
              render={() => (
                <Suspense fallback={<div>lazy loading...</div>}>
                  <TestPage />
                </Suspense>
              )}
            />
            <Route path={'/users'} render={() => <UsersContainer />} />
            <Route path={'/*'} render={() => <div>404 NOT FOUND</div>} />
          </Switch>
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
