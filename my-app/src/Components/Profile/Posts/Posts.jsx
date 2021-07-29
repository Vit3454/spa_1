import React from 'react'
import s from './Posts.module.css'
import osc from '../../../App.module.css'
import Post from './Post/Post'

const posts = [
  { id: 0, name: 'Alex', message: 'Hi there!' },
  { id: 1, name: 'Stive', message: 'Haw are you?' },
  { id: 2, name: 'Fred', message: 'Lets go!!!' },
]

const Posts = () => {
  const postCollection = posts.map((p) => {
    return <Post key={p.id} name={p.name} message={p.message} />
  })

  return (
    <div className={osc.component}>
      <div className={s.newPost}>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={s.postList}>
        Posts:
        {postCollection}
      </div>
    </div>
  )
}

export default Posts
