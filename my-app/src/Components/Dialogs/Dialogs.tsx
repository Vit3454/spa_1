import React from 'react'
import s from './Dialogs.module.css'
import os from '../../App.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import ReduxDialogsForm from './DialogsForm/DialogsForm'
import { DialogType, MessageType } from '../../redux/dialogs-reducer'

type PropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  sendMessage: (newMessage: string) => void
}

const Dialogs: React.FC<PropsType> = ({ dialogs, messages, sendMessage }) => {
  const dialogsElements = dialogs.map((d) => {
    return <Dialog key={d.id} name={d.name} id={d.id} />
  })

  const messagesElements = messages.map((m) => {
    return <Message key={m.id} message={m.message} />
  })

  const onAddMessage = (formData: { message: string }) => {
    sendMessage(formData.message)
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
