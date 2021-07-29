import React from 'react'
import s from './Dialogs.module.css'
import os from '../../App.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'

const dialogs = [
  { id: 0, name: 'Alex' },
  { id: 1, name: 'Stive' },
  { id: 2, name: 'Fred' },
  { id: 3, name: 'Erika' },
]

const messages = [
  { id: 0, message: 'Heello' },
  { id: 1, message: 'haw are you?' },
  { id: 2, message: 'yo!' },
  { id: 3, message: 'hey' },
]

const Dialogs = (props) => {
  const dialogsCollection = dialogs.map((d) => {
    return <Dialog key={d.id} name={d.name} id={d.id} />
  })

  const messagesCollection = messages.map((m) => {
    return <Message key={m.id} message={m.message} />
  })

  return (
    <div className={s.dialogs + ' ' + os.block}>
      <div className={s.dialogsItem}>{dialogsCollection}</div>
      <div className={s.messages}>{messagesCollection}</div>
    </div>
  )
}

export default Dialogs
