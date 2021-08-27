import React, { ChangeEvent } from 'react'
import osc from '../../../../App.module.css'
import s from './ProfileStatus.module.css'

type PropsType = {
  status: string | null
  updateStatus: (newStatus: string | null) => void
}

class ProfileStatus extends React.Component<PropsType> {
  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode() {
    this.setState({
      editMode: true,
      status: this.props.status,
    })
  }

  deActivateEditMode() {
    this.setState({
      editMode: false,
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    })
  }

  render() {
    return (
      <div className={osc.component + ' ' + s.ProfileStatus}>
        <div>
          {this.state.editMode ? (
            <input
              value={this.state.status as string}
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
