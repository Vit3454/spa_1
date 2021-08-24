import React from 'react'
import s from './Dialogs.module.css'
import os from '../../App.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import ReduxDialogsForm from './DialogsForm/DialogsForm'

const Dialogs = (props) => {
  const dialogsElements = props.dialogs.map((d) => {
    return <Dialog key={d.id} name={d.name} id={d.id} />
  })

  const messagesElements = props.messages.map((m) => {
    return <Message key={m.id} message={m.message} />
  })

  // send messages
  const onAddMessage = (formData) => {
    console.log(formData)
    props.sendMessage(formData.message)
  }

  return (
    <>
      <div>
        <ReduxDialogsForm onSubmit={onAddMessage} />
      </div>
      <div className={s.dialogs + ' ' + os.block}>
        <div className={s.dialogsItem}>{dialogsElements}</div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
    </>
  )
}

export default Dialogs
