import {
  initialStateType, toggleFollowingProgress,
  UserType
} from "../../redux/users-reduser";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import React, {Component, FunctionComponent} from "react";
import Preloader from "../Preloader/Preloader"
import axios from "axios";
import {
  follow,
  unfollow,
  requestUsers
} from "./../../redux/users-reduser";
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from "../../redux/user-selectors";

export type MapStatePropsType = initialStateType

export type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  //setUsers: (users: UserType[]) => void;
  //setCurrentPage: (currentPage: number) => void
  //setTotalUsersCount: (totalUsersCount: number) => void
  //toggleLoader: (isLoading: boolean) => void
  //toggleFollowingProgress: (isLoading: boolean, userId: number) => void
  requestUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends Component<UsersPropsType & initialStateType> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    // this.props.toggleLoader(!this.props.isLoading)
    // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
    //   .then((response) => {
    //     this.props.setUsers(response.items)
    //     {console.log(typeof response.totalCount)}
    //     {console.log(this.props.setTotalUsersCount)}
    //     this.props.setTotalUsersCount(response.totalCount)
    //   })
    //   .catch((err) => {
    //   console.log(err)
    // })
    //   .finally(() => {
    //   this.props.toggleLoader(!this.props.isLoading)
    // });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.requestUsers(pageNumber, this.props.pageSize)
    // this.props.setCurrentPage(pageNumber)
    // this.props.toggleLoader(!this.props.isLoading)
    // usersAPI.getUsers(pageNumber, this.props.pageSize)
    //   .then((response) => {
    //     this.props.setUsers(response.items)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    //   .finally(() => {
    //     this.props.toggleLoader(!this.props.isLoading)
    //   });
    // ;
  }

  render() {
    return <>
      {this.props.isLoading ? <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  onPageChange={this.onPageChanged}
                  followingInProgress={this.props.followingInProgress}
                  //toggleFollowingProgress={this.props.toggleFollowingProgress}
      />
    </>
  }
}

export let mapStateToProps  = (state: AppStateType ): MapStatePropsType  => {

    return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isLoading: getIsLoading(state),
      followingInProgress: getFollowingInProgress(state)
    }
  }

// export let mapDispatchToProps  = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//       follow: (userId: number) => {
//         dispatch(followAC(userId))
//       },
//       unfollow: (userId: number) => {
//         dispatch(unfollowAC(userId))
//       },
//       setUsers: (users: UserType[]) => {
//         dispatch(setUsersAC(users))
//       },
//       setCurrentPage: (currentPage: number) => {
//         dispatch(setCurrentPageAC(currentPage))
//       },
//       setTotalUsersCount: (totalUsersCount: number) => {
//         dispatch(setTotalUsersCountAC(totalUsersCount))
//       },
//       toggleLoader: (isLoading: boolean) => {
//         dispatch(toggleLoaderAC(isLoading))
//       }
//     }
//   }

  // export default connect(mapStateToProps, {
  //   follow, unfollow, getUsers
  // })(UsersContainer);

export default compose<React.FC>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {follow, unfollow, requestUsers}),
  )(UsersContainer)