import {followAC, initialStateType, setUsersAC, UserType} from "../../redux/users-reduser";
import {unfollowAC} from "../../redux/users-reduser";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
  usersPage: initialStateType
}

type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps  = (state: AppStateType): MapStatePropsType => {
    return {
      usersPage: state.usersPage,
      // users: state.usersPage.users,
    }
  }

  let mapDispatchToProps  = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
      follow: (userId: number) => {
        dispatch(followAC(userId))
      },
      unfollow: (userId: number) => {
        dispatch(unfollowAC(userId))
      },
      setUsers: (users: UserType[]) => {
        dispatch(setUsersAC(users))
      }

    }
  }

  export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);