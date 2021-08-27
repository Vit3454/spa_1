import React from 'react'
import s from './Post.module.css'
import osc from '../../../../App.module.css'

type PropsType = {
  message: string
}

const Post: React.FC<PropsType> = ({ message }) => {
  return (
    <div className={osc.component + ' ' + s.post}>
      <div className={s.user}>user name</div>
      <div className={s.postText}>{message}</div>
    </div>
  )
}

export default Post
