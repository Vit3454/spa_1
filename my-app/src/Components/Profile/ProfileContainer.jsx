import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getProfile,
  getStatus,
  updateStatus,
} from '../../redux/profile-reducer'
import Profile from './Profile'

class ProfileContainer extends React.Component {
  componentDidMount() {
    console.log('componentDidMount')
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authUserId
      if (!userId) this.props.history.push('/login')
    }
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  render() {
    return (
      <Profile
        userProfile={this.props.userProfile}
        isAuth={this.props.isAuth}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authUserId: state.auth.authUserId,
  }
}

const WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
  getProfile,
  getStatus,
  updateStatus,
})(WithURLDataContainerComponent)
