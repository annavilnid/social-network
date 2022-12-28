import {ActionType} from "./store";
import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT ='SET-TOTAL-USERS-COUNT';
const TOGGLE_LOADER ='TOGGLE-LOADER';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS';

export type initialStateType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isLoading: boolean
  followingInProgress: any
}

export type UserType = {
  id: number
  photos: PhotosType
  followed: boolean
  name: string
  message: string
  location?: UserLocationType
  status: string
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
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isLoading: false,
  followingInProgress: []
}

const usersReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return  {
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
        users: [...action.users],
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    case TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.followingInProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id: number) => id !== action.userId)
      }
    default:
      return state;
  }
}
export const followSuccess = (userId: number) => ({type:'FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type:'UNFOLLOW', userId} as const)
export const setUsers = (users: UserType[]) => ({type:'SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type:'SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type:'SET-TOTAL-USERS-COUNT', totalUsersCount} as const)
export const toggleLoader = (isLoading: boolean) => ({type:'TOGGLE-LOADER', isLoading} as const)
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number) => ({type:'FOLLOWING-IN-PROGRESS', followingInProgress, userId} as const)

export const requestUsers = (page: number, pageSize: number) => {
  return (dispatch: any) => {
    dispatch(toggleLoader(true));
    dispatch(setCurrentPage(page));
    usersAPI.getUsers(page, pageSize)
      .then((response) => {
        dispatch(setUsers(response.items))
        dispatch(setTotalUsersCount(response.totalCount))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(toggleLoader(false))
      });
  }
}
export const unfollow = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.unfollow(userId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
      })
      .catch((err) => {
        console.log('err');
      });
  }
}
export const follow = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.follow(userId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
      })
      .catch((err) => {
        console.log('err');
      });
  }
}


export default usersReducer;