import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import {
  follow,
  setCurrentPage,
  setTotalUserCount,
  setUsers,
  toggleIsFetching,
  unfollow,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true)
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.setUsers(response.data.items)
        this.props.toggleIsFetching(false)
        this.props.setTotalUserCount(response.data.totalCount)
      })
  }

  onPageChaged = (currentPage) => {
    this.props.setCurrentPage(currentPage)
    this.props.toggleIsFetching(true)
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${currentPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.setUsers(response.data.items)
        this.props.toggleIsFetching(false)
        this.props.setTotalUserCount(response.data.totalCount)
      })
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : undefined}
        <Users {...this.props} onPageChaged={this.onPageChaged} />
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
})

export default connect(mapStateToProps, {
  setUsers,
  follow,
  unfollow,
  setTotalUserCount,
  setCurrentPage,
  toggleIsFetching,
})(UsersContainer)
