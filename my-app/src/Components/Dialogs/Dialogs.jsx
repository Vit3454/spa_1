import React from 'react'
import s from './Dialogs.module.css'
import os from '../../App.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'

const Dialogs = (props) => {
  const dialogsElements = props.dialogs.map((d) => {
    return <Dialog key={d.id} name={d.name} id={d.id} />
  })

  const messagesElements = props.messages.map((m) => {
    return <Message key={m.id} message={m.message} />
  })

  // change input
  const onChangeMessage = (e) => {
    props.updateNewMessageText(e.target.value)
  }

  // send messages
  const onAddMessage = () => {
    props.addMessage()
  }

  return (
    <>
      <div>
        <div>
          <input onChange={onChangeMessage} value={props.newMessageText} />
        </div>
        <div>
          <button onClick={onAddMessage}>Отправить</button>
        </div>
      </div>
      <div className={s.dialogs + ' ' + os.block}>
        <div className={s.dialogsItem}>{dialogsElements}</div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
    </>
  )
}

export default Dialogs
