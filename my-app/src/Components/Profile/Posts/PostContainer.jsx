import React from 'react'
import Posts from './Posts'
import { addPost } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const PostsContainer = (props) => {
  return <Posts {...props} />
}

const mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
})

export default connect(mapStateToProps, { addPost })(PostsContainer)
