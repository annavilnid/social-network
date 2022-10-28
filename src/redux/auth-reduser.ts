import {ActionType} from "./store";
import {MyPostType, ProfileType} from "./profle-reduser";

const SET_USER_DATA = 'SET-USER-DATA';

export type initialStateType = {
  userId: null | number
  email: null | string
  login: null | string
  isAuth: boolean
  isLoading: boolean
}

export type dataType = {
  userId: number
  email: string
  login: string
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
        ...action.data,
        isAuth: true
      }
    default:
      return state
  }
}

export const setAuthUserData = (data: dataType) => ({type:'SET-USER-DATA', data} as const)

export default authReducer;