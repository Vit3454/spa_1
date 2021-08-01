import React from 'react'
import { connect } from 'react-redux'
import { sendMessage, updateNewMessageText } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
  return <Dialogs {...props} />
}

const mapStateToProps = (state) => ({
  dialogs: state.dialogsPage.dialogs,
  messages: state.dialogsPage.messages,
  newMessageText: state.dialogsPage.newMessageText,
})

export default connect(mapStateToProps, { updateNewMessageText, sendMessage })(
  DialogsContainer
)
