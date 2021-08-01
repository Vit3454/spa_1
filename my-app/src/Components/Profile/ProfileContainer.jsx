import * as axios from 'axios'
import React from 'react'
import Profile from './Profile'
import { setUserProfile } from '../../redux/profile-reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId

    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data)
      })
  }

  render() {
    return <Profile userProfile={this.props.userProfile} />
  }
}

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
})

const WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setUserProfile })(
  WithURLDataContainerComponent
)
