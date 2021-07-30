import React from 'react'
import Posts from './Posts'
import { addPost, updateNewPostText } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const PostsContainer = (props) => {
  return <Posts {...props} />
}

const mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
  newPostText: state.profilePage.newPostText,
})

const mapDispatchToProps = (dispatch) => ({
  onChangePost: (newPostText) => {
    dispatch(updateNewPostText(newPostText))
  },
  onAddPost: () => {
    dispatch(addPost())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)
