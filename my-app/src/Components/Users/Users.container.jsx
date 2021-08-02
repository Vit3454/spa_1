import React from 'react'
import { connect } from 'react-redux'
import {
  follow,
  setCurrentPage,
  setTotalUserCount,
  setUsers,
  toggleIsFetching,
  unfollow,
  toggleFollowingInProgress,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import { usersAPI } from '../../api/api'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true)
    usersAPI
      .getUsers(this.props.pageSize, this.props.currentPage)
      .then((data) => {
        this.props.setUsers(data.items)
        this.props.toggleIsFetching(false)
        this.props.setTotalUserCount(data.totalCount)
      })
  }

  onPageChaged = (currentPage) => {
    this.props.setCurrentPage(currentPage)
    this.props.toggleIsFetching(true)
    usersAPI.getUsers(this.props.pageSize, currentPage).then((data) => {
      this.props.setUsers(data.items)
      this.props.toggleIsFetching(false)
      this.props.setTotalUserCount(data.totalCount)
    })
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
  setUsers,
  follow,
  unfollow,
  setTotalUserCount,
  setCurrentPage,
  toggleIsFetching,
  toggleFollowingInProgress,
})(UsersContainer)
