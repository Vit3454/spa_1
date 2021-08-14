import React from 'react'
import osc from '../../../../App.module.css'
import s from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  }

  activateEditMode() {
    // this.setState async function
    this.setState({
      editMode: true,
      status: this.props.status,
    })
  }

  deActivateEditMode() {
    // setState async function!
    this.setState({
      editMode: false,
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate')
  // }

  render() {
    return (
      <div className={osc.component + ' ' + s.ProfileStatus}>
        <div>
          {this.state.editMode ? (
            <input
              value={this.state.status}
              onChange={this.onStatusChange}
              onBlur={this.deActivateEditMode.bind(this)}
              autoFocus={true}
            />
          ) : (
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status ? this.props.status : '-------'}
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default ProfileStatus