import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout, login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/store'

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}

type MapDispatchPrpopsType = {
  logout: () => void
}

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPrpopsType

const HeaderContainer: React.FC<HeaderContainerPropsType> = ({
  logout,
  login,
  isAuth,
}) => {
  return <Header logout={logout} login={login} isAuth={isAuth} />
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect(mapStateToProps, { logout })(HeaderContainer)
