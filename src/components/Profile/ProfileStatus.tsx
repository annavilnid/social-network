import React, {ChangeEvent, ChangeEventHandler} from "react";

type ProfileStatusType = {
  status: string
  updateUserStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
    // this.forceUpdate()
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateUserStatus(this.state.status)
  }

  onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.currentTarget.value' + ' ' + e.currentTarget.value)
       this.setState({
         status: e.currentTarget.value
       })
  }

  componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
    console.log(this.state)
    console.log(this.props)
    console.log(prevProps.status)
    console.log(this.props.status)
    if (prevProps.status !== this.props.status) {
      console.log("значение в инпуте должно обновиться")
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onChangeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
          </div>
        }
      </>
    );
  }
}