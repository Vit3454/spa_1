import * as axios from 'axios'
import React from 'react'
import Profile from './Profile'
import { setUserProfile } from '../../redux/profile-reducer'
import { connect } from 'react-redux'

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/profile/2')
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
