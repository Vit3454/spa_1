import React from 'react'
import s from './App.module.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import TestPage from './Components/TestPage/TestPage'
import { Route } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/Users.container'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import Login from './Components/Login/Login'
import { connect } from 'react-redux'
import axios from 'axios'
import { setAuthUserData } from './redux/auth-reducer'

class App extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          let { id, email, login } = response.data.data
          this.props.setAuthUserData(id, email, login)
        }
      })
  }

  render() {
    return (
      <div className={s.app}>
        <HeaderContainer />
        <Sidebar />
        <div className={s.content}>
          <Route path={'/'} exact render={() => <ProfileContainer />} />
          <Route path={'/login'} render={() => <Login />} />
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
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { setAuthUserData })(App)
