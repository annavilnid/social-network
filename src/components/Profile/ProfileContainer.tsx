import {addPost, ProfileType, setUserProfile, updatePost} from "../../redux/profle-reduser";
import {Component, ComponentClass, ComponentType} from "react";
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
  initialStateType,
} from "../../redux/profle-reduser";

import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../redux/users-reduser";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamType = {
 userId: string
}

type PropsType = RouteComponentProps<PathParamType> & ProfileContainerPropsType

export type MapStatePropsType = {
  profile: null | ProfileType
}

export type MapDispatchPropsType = {
  setUserProfile: (userId: null | any) => void;
}

export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends Component <PropsType> {
  componentDidMount() {
    let userId = +this.props.match.params.userId
    if (!userId) {
      userId = 26437
    }
    console.log(this.props)
    // {this.props.toggleLoader(this.props.isLoading)}
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        {console.log(typeof response)}
      this.props.setUserProfile(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        // this.props.toggleLoader(this.props.isLoading)
        console.log(userId)
      });
  }

  render() {
    return <>
      <Profile {...this.props} profile={this.props.profile}/>
      {/*<div>1222</div>*/}
    </>
  }
}

export let mapStateToProps  = (state: AppStateType ): MapStatePropsType  => {
  return {
    profile: state.profilePage.profile,
  }
}

let WithUrlDataContainerComponent:any = withRouter<any, any>(ProfileContainer)

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);

// compose<ComponentType>(connect<>(),withRouter)(ProfileContainer)