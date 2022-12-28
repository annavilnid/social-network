import {ActionType} from "./store";
import {MyPostType, ProfileType} from "./profle-reduser";
import {authAPI, usersAPI} from "../api/api";
import {followSuccess, toggleFollowingProgress} from "./users-reduser";
import {stopSubmit} from "redux-form";
import {getUserInfo} from "./auth-reduser";

const SET_INITIALIZING = 'SET_INITIALIZING';

export type initialStateType = {
  initialized: boolean
}

export type dataType = {
  userId: null | number
  email: null | string
  login: null | string
  isAuth: boolean
}

let initialState: initialStateType = {
  initialized: false
}

const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case SET_INITIALIZING:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const initializedSuccess = () => ({type:'SET_INITIALIZING'} as const)
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getUserInfo());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer;