import React from "react"
import { connect } from "react-redux"
import {
  follow,
  unfollow,
  toggleFollowingInProgress,
  getUsers,
} from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../Common/Preloader/Preloader"
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersFromState,
} from "../../redux/users-selectors"

class UsersContainer extends React.Component {
  componentDidMount() {
    let { pageSize, currentPage } = this.props
    this.props.getUsers(pageSize, currentPage)
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

// mapStateToProps вызывается каждый раз при изменении в state
const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, {
  follow,
  unfollow,
  toggleFollowingInProgress,
  getUsers,
})(UsersContainer)
