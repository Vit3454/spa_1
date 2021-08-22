import React from 'react'
import { connect } from 'react-redux'
import {
  follow,
  unfollow,
  // toggleFollowingInProgress,
  getUsers,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersFromState,
} from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/store'

type MapStatePropsType = {
  pageSize: number
  currentPage: number
  users: Array<UserType>
  isFetching: boolean
  followingInProgress: Array<number>
  // toggleFollowingInProgress: any
  totalUsersCount: number
  portionSize: number
}

type MapDispatchPropsType = {
  getUsers: (pageSize: number, currentPage: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let { pageSize, currentPage } = this.props
    this.props.getUsers(pageSize, currentPage)
  }

  onPageChaged = (currentPage: number) => {
    this.props.getUsers(this.props.pageSize, currentPage)
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : undefined}
        <Users
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          // toggleFollowingInProgress={this.props.toggleFollowingInProgress}
          followingInProgress={this.props.followingInProgress}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          portionSize={this.props.portionSize}
          currentPage={this.props.currentPage}
          onPageChaged={this.onPageChaged}
        />
      </>
    )
  }
}

// mapStateToProps вызывается каждый раз при изменении в state
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersFromState(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    portionSize: state.usersPage.portionSize,
  }
}

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  follow,
  unfollow,
  getUsers,
})(UsersContainer)
