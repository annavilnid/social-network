import {ActionType, UsersPageType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

export type initialStateType = {
  users: UserType[]
}

export type UserType = {
  id: number
  photos: PhotosType
  followed: boolean
  name: string
  message: string
  location?: UserLocationType
}

export type PhotosType = {
  small: string
  large: string
}

export type UserLocationType = {
  country: string
  city: string
}

export let initialState: initialStateType = {
    users: []
}

const usersReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => action.userId === u.id ? {...u, followed: true} : u),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => action.userId === u.id ? {...u, followed: false} : u),
      }
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      }
    default:
      return state;
  }
}
export const followAC = (userId: number) => ({type:'FOLLOW', userId} as const)
export const unfollowAC = (userId: number) => ({type:'UNFOLLOW', userId} as const)
export const setUsersAC = (users: UserType[]) => ({type:'SET-USERS', users} as const)

export default usersReducer;