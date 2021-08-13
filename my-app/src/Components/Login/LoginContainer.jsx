import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/auth-reducer'
import Login from './Login'

class LoginContainer extends React.Component {
  render() {
    if (this.props.isAuth) return <Redirect to={'/profile'} />
    return <Login {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(LoginContainer)
