import React from 'react'
import s from './Posts.module.css'
import osc from '../../../App.module.css'
import Post from './Post/Post'
import ReduxNewPostForm from './NewPostForm/NewPostForm'

const Posts = (props) => {
  console.log('render')
  const postElements = props.posts.map((p) => {
    return <Post key={p.id} name={p.name} message={p.message} />
  })
  // add new post
  const onAddPost = (formData) => {
    props.addPost(formData.message)
  }

  return (
    <div className={osc.component}>
      <ReduxNewPostForm onSubmit={onAddPost} />
      <div className={s.postList}>
        Posts:
        {postElements}
      </div>
    </div>
  )
}

export default Posts
