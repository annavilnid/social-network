import {ActionType} from "./store";
import {MyPostType, ProfileType} from "./profle-reduser";
import {authAPI, usersAPI} from "../api/api";
import {followSuccess, toggleFollowingProgress} from "./users-reduser";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';
const SIGN_IN = 'SIGN_IN';

export type initialStateType = {
  userId: null | number
  email: null | string
  login: null | string
  isAuth: boolean
  isLoading: boolean
}

export type dataType = {
  userId: null | number
  email: null | string
  login: null | string
  isAuth: boolean
}

let initialState = {
  userId: null,
  email: null,
  login: null,
  isLoading: false,
  isAuth: false
}

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export const setAuthUserData = (data: dataType) => ({type:'SET-USER-DATA', data} as const)
export const getUserInfo = () => (dispatch: any) => {
    // this.props.toggleLoader(!this.props.isLoading)
    return authAPI.getUserInfo()
      .then((response) => {
        if (response.data.resultCode === 0) {
          let userAuthData: dataType = {
            userId: response.data.data.id,
            login: response.data.data.login,
            email: response.data.data.email,
            isAuth: true
          }
          dispatch(setAuthUserData(userAuthData))
        }
      })
      // .catch((err) => {
      //   console.log(err)
      // })
      // .finally(() => {
      //   // this.props.toggleLoader(!this.props.isLoading)
      // });
}

export const signIn = (userData: dataType) => {
  return (dispatch: any) => {
    console.log('санка')
    authAPI.signIn(userData)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(getUserInfo())
        } else {
          let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
          dispatch(stopSubmit("login", {_error: message}));
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        // this.props.toggleLoader(!this.props.isLoading)
      });
  }
}

export const signOut = () => {
  return (dispatch: any) => {
    authAPI.signOut()
      .then((response) => {
        if (response.data.resultCode === 0) {
          let userAuthData: dataType = {
            userId: null,
            login: null,
            email: null,
            isAuth: false
          }
          dispatch(setAuthUserData(userAuthData))
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        // this.props.toggleLoader(!this.props.isLoading)
      });
  }
}

export default authReducer;