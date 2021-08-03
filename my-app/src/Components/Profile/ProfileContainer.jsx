import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { usersAPI } from '../../api/api'
import { getProfile } from '../../redux/profile-reducer'
import Profile from './Profile'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      // userId = this.props.authUserId
      userId = 18752
    }
    this.props.getProfile(userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      const userId = this.props.authUserId
      this.props.getProfile(userId)
    }
  }

  render() {
    // if (!this.props.isAuth) return <Redirect to={'/login'} />
    return (
      <Profile
        userProfile={this.props.userProfile}
        isAuth={this.props.isAuth}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  isAuth: state.auth.isAuth,
  authUserId: state.auth.authUserId,
})

const WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { getProfile })(
  WithURLDataContainerComponent
)
