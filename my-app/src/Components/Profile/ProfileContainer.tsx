import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  getProfile,
  getStatus,
  savePhoto,
  saveProfile,
  updateStatus,
} from '../../redux/profile-reducer'
import { AppStateType } from '../../redux/store'
import { UserProfileType } from '../../types/types'
import Profile from './Profile'

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropstype = {
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (newStatus: string | null) => void
  savePhoto: (foto: File) => void
  saveProfile: (formData: UserProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapStatePropsType &
  MapDispatchPropstype &
  RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  // refreshProfile() {
  //   let userId = this.props.match.params.userId
  //   if (!userId) {
  //     userId = this.props.authUserId
  //     if (!userId) this.props.history.push("/login")
  //   }
  //   this.props.getProfile(userId)
  //   this.props.getStatus(userId)
  // }

  componentDidMount() {
    let userId: number | null = +this.props.match.params.userId
    if (!userId) {
      userId = this.props.authUserId
      if (!userId) this.props.history.push('/login')
    }
    this.props.getProfile(userId as number)
    this.props.getStatus(userId as number)
  }

  render() {
    return (
      <Profile
        isOwner={!this.props.match.params.userId}
        userProfile={this.props.userProfile}
        isAuth={this.props.isAuth}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
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
  savePhoto,
  saveProfile,
})(WithURLDataContainerComponent)
