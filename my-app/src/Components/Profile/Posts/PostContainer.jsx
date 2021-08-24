import Posts from './Posts'
import { actions } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const PostsContainer = (props) => {
  return <Posts {...props} />
}

const mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
})

export default connect(mapStateToProps, { addPost: actions.addPost })(
  PostsContainer
)
