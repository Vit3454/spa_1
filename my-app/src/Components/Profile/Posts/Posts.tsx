import React from 'react'
import s from './Posts.module.css'
import osc from '../../../App.module.css'
import Post from './Post/Post'
import ReduxNewPostForm from './NewPostForm/NewPostForm'
import { PostType } from '../../../types/types'

type PropsType = {
  posts: Array<PostType>
  addPost: (newPost: string) => void
}

const Posts: React.FC<PropsType> = ({ posts, addPost }) => {
  const postElements = posts.map((p) => {
    return <Post key={p.id} message={p.message} />
  })

  type FormDataType = {
    message: string
  }
  // add new post
  const onAddPost = (formData: FormDataType) => {
    addPost(formData.message)
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
