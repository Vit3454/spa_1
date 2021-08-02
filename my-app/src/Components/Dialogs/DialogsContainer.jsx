import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { sendMessage, updateNewMessageText } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
  if (!props.isAuth) return <Redirect to={'login'} />
  return <Dialogs {...props} />
}

const mapStateToProps = (state) => ({
  dialogs: state.dialogsPage.dialogs,
  messages: state.dialogsPage.messages,
  newMessageText: state.dialogsPage.newMessageText,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { updateNewMessageText, sendMessage })(
  DialogsContainer
)
