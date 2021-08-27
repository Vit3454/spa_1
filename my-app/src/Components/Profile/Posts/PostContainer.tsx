import Posts from './Posts'
import { actions } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/store'
import { PostType } from '../../../types/types'

type PropsType = {
  posts: Array<PostType>
  addPost: (newPost: string) => void
}

const PostsContainer: React.FC<PropsType> = ({ posts, addPost }) => {
  return <Posts posts={posts} addPost={addPost} />
}

type mapState = {
  posts: Array<PostType>
}

type mapDispatch = {
  addPost: (newPost: string) => void
}

const mapStateToProps = (state: AppStateType): mapState => ({
  posts: state.profilePage.posts,
})

export default connect<mapState, mapDispatch, {}, AppStateType>(
  mapStateToProps,
  { addPost: actions.addPost }
)(PostsContainer)
