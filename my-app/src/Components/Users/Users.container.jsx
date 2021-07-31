import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import {
  follow,
  setCurrentPage,
  setTotalUserCount,
  setUsers,
  unfollow,
} from '../../redux/users-reducer'
import Users from './Users'

class UsersContainer extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items)
        this.props.setTotalUserCount(response.data.totalCount)
      })
  }

  onPageChaged = (currentPage) => {
    this.props.setCurrentPage(currentPage)
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${currentPage}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items)
        this.props.setTotalUserCount(response.data.totalCount)
      })
  }

  render() {
    console.log('render')
    return <Users {...this.props} onPageChaged={this.onPageChaged} />
  }
}

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
  totalUsersCount: state.usersPage.totalUsersCount,
  pageSize: state.usersPage.pageSize,
  currentPage: state.usersPage.currentPage,
})

const mapDispatchToProps = (dispatch) => ({
  setUsers: (users) => {
    dispatch(setUsers(users))
  },

  follow: (userId) => {
    dispatch(follow(userId))
  },

  unfollow: (userId) => {
    dispatch(unfollow(userId))
  },

  setTotalUserCount: (totalUsersCount) => {
    dispatch(setTotalUserCount(totalUsersCount))
  },

  setCurrentPage: (currentPage) => {
    dispatch(setCurrentPage(currentPage))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
