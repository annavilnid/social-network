import {sendPost, getUserStatus, ProfileType, setUserProfile, updateUserStatus} from "../../redux/profle-reduser";
import React, {Component, ComponentClass, ComponentType, FunctionComponent} from "react";
import axios from "axios";
import {Profile} from "./Profile"
import {connect} from "react-redux";
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleLoader,
  unfollow
} from "./../../redux/users-reduser";
import {
  initialStateType, getProfileInfo
} from "../../redux/profle-reduser";

import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../redux/users-reduser";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

type PathParamType = {
 userId: string
}

type PropsType = RouteComponentProps<PathParamType> & ProfileContainerPropsType

export type MapStatePropsType = {
  profile: null | ProfileType
  status: string
  authorizedUserId: null | number
  isAuth: boolean
}

export type MapDispatchPropsType = {
  // setUserProfile: (userId: null | any) => void;
  getProfileInfo: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
}

export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends Component <PropsType> {
  componentDidMount() {
    let userId: number | null = +this.props.match.params.userId  // Уточнить про эту строку кода
    if (!userId) {
      userId = this.props.authorizedUserId
      debugger
    if (!userId) {
        this.props.history.push('/login')
      }
    }
    if (userId) {
      this.props.getProfileInfo(userId)
      this.props.getUserStatus(userId)
      // console.log(this.props)
      // // {this.props.toggleLoader(!this.props.isLoading)}
      // usersAPI.getProfileInfo(userId)
      //   .then((response) => {
      //     {console.log(typeof response)}
      //   this.props.setUserProfile(response.data)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      //   .finally(() => {
      //     // this.props.toggleLoader(!this.props.isLoading)
      //     console.log(userId)
      //   });
    }
  }

  render() {
    return (
      <>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
      </>
    )
  }
}

export let mapStateToProps  = (state: AppStateType ): MapStatePropsType  => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  }
}

export default compose<React.FC>(
  connect(mapStateToProps, {getProfileInfo, getUserStatus, updateUserStatus}),
  withRouter,
  // withAuthRedirect
  )(ProfileContainer)


//export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getProfileInfo})(WithUrlDataContainerComponent);

///compose<ComponentType>(connect<>(),withRouter)(ProfileContainer)