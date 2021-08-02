import * as axios from 'axios'
import React from 'react'
import Profile from './Profile'
import { setUserProfile } from '../../redux/profile-reducer'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authUserId
      if (userId) {
        axios
          .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
          .then((response) => {
            this.props.setUserProfile(response.data)
          })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      const userId = this.props.authUserId
      axios
        .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then((response) => {
          this.props.setUserProfile(response.data)
        })
    }
  }

  render() {
    if (!this.props.isAuth) return <Redirect to={'/login'} />
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

export default connect(mapStateToProps, { setUserProfile })(
  WithURLDataContainerComponent
)
