import React from 'react'
import { connect } from 'react-redux'
import {
  follow,
  unfollow,
  toggleFollowingInProgress,
  getUsers,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }

  onPageChaged = (currentPage) => {
    this.props.getUsers(this.props.pageSize, currentPage)
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : undefined}
        <Users
          {...this.props}
          followingInProgress={this.props.followingInProgress}
          onPageChaged={this.onPageChaged}
          toggleFollowingInProgress={this.props.toggleFollowingInProgress}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
  totalUsersCount: state.usersPage.totalUsersCount,
  pageSize: state.usersPage.pageSize,
  currentPage: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress,
})

export default connect(mapStateToProps, {
  follow,
  unfollow,
  toggleFollowingInProgress,
  getUsers,
})(UsersContainer)
