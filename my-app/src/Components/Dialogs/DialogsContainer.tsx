import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { actions, DialogType, MessageType } from '../../redux/dialogs-reducer'
import { AppStateType } from '../../redux/store'
import Dialogs from './Dialogs'

type MapStatePropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  isAuth: boolean
}

type MapDispatchPropsType = {
  sendMessage: (newMessage: string) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const DialogsContainer: React.FC<PropsType> = (props) => {
  return <Dialogs {...props} />
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dialogs: state.dialogsPage.dialogs,
  messages: state.dialogsPage.messages,
  isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { ...actions }
  ),
  withAuthRedirect
)(DialogsContainer)
