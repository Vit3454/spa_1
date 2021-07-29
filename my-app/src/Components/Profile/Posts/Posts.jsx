import React from 'react'
import s from './Posts.module.css'
import osc from '../../../App.module.css'
import Post from './Post/Post'

const Posts = (props) => {
  const postElements = props.posts.map((p) => {
    return <Post key={p.id} name={p.name} message={p.message} />
  })

  // textarea change
  const onChangePost = (e) => {
    props.updateNewPostText(e.target.value)
  }
  // add new post
  const onAddPost = () => {
    props.addPost()
  }

  return (
    <div className={osc.component}>
      <div className={s.newPost}>
        <div>
          <textarea
            onChange={onChangePost}
            value={props.newPostText}
          ></textarea>
        </div>
        <div>
          <button onClick={onAddPost}>Добавить пост</button>
        </div>
      </div>
      <div className={s.postList}>
        Posts:
        {postElements}
      </div>
    </div>
  )
}

export default Posts
