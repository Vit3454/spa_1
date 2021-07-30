import React from 'react'
import s from './Post.module.css'
import osc from '../../../../App.module.css'

const Post = (props) => {
  return (
    <div className={osc.component + ' ' + s.post}>
      <div className={s.user}>user name</div>
      <div className={s.postText}>{props.message}</div>
    </div>
  )
}

export default Post
