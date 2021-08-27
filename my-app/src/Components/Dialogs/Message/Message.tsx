import React from 'react'
import s from './Message.module.css'
import osc from '../../../App.module.css'

type MessagePropsType = {
  message: string
}

const Message: React.FC<MessagePropsType> = ({ message }) => {
  return <div className={osc.component + ' ' + s.message}>{message}</div>
}

export default Message
