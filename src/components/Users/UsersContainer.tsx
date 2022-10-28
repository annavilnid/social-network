import {
  initialStateType,
  UserType
} from "../../redux/users-reduser";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Component} from "react";
import Preloader from "../Preloader/Preloader"
import axios from "axios";
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleLoader,
  unfollow
} from "./../../redux/users-reduser";

export type MapStatePropsType = initialStateType

export type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalUsersCount: number) => void
  toggleLoader: (isLoading: boolean) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends Component<UsersPropsType & initialStateType> {
  componentDidMount() {
    {this.props.toggleLoader(this.props.isLoading)}
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items)
        {console.log(typeof response.data.totalCount)}
        {console.log(this.props.setTotalUsersCount)}
        this.props.setTotalUsersCount(response.data.totalCount)
      })
      .catch((err) => {
      console.log(err)
    })
      .finally(() => {
      this.props.toggleLoader(this.props.isLoading)
    });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    {this.props.toggleLoader(this.props.isLoading)}
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.props.toggleLoader(this.props.isLoading)
      });
    ;
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
      />
    </>
  }
}

export let mapStateToProps  = (state: AppStateType ): MapStatePropsType  => {

    return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isLoading: state.usersPage.isLoading
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

  export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleLoader})(UsersContainer);