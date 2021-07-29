import React from 'react'
import s from './Message.module.css'
import osc from '../../../App.module.css'

const Message = (props) => {
  return <div className={osc.component + ' ' + s.message}>{props.message}</div>
}

export default Message
