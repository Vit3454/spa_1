import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../redux/store'

export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<MapStateType & MapDispatchType> = (
    props
  ) => {
    const { isAuth, ...restProps } = props
    if (!isAuth) return <Redirect to={'/login'} />
    return <WrappedComponent {...(restProps as WCP)} />
  }

  const mapStateToProps = (state: AppStateType) =>
    ({
      isAuth: state.auth.isAuth,
    } as MapStateType)

  type MapStateType = {
    isAuth: boolean
  }

  type MapDispatchType = {
    isAuth: boolean
  }

  return connect<MapStateType, MapDispatchType, WCP, AppStateType>(
    mapStateToProps
  )(RedirectComponent)
}
