import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/store'
import Login from './Login'

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchPropsTypeType = {
  login: (
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsTypeType & OwnPropsType

class LoginContainer extends React.Component<PropsType> {
  render() {
    if (this.props.isAuth) return <Redirect to={'/profile'} />
    return <Login captchaUrl={this.props.captchaUrl} login={this.props.login} />
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

export default connect<
  MapStatePropsType,
  MapDispatchPropsTypeType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, { login })(LoginContainer)
