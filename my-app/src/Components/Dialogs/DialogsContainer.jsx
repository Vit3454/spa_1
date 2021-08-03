import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { sendMessage, updateNewMessageText } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
  return <Dialogs {...props} />
}

const mapStateToProps = (state) => ({
  dialogs: state.dialogsPage.dialogs,
  messages: state.dialogsPage.messages,
  newMessageText: state.dialogsPage.newMessageText,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(mapStateToProps, { updateNewMessageText, sendMessage }),
  withAuthRedirect
)(Dialogs)
