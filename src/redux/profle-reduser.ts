import {ActionType} from "./store";
import {followSuccess, toggleFollowingProgress, UserType} from "./users-reduser";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_POST = 'UPDATE-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS_PROFILE = 'SET-STATUS-PROFILE';

export type initialStateType = {
  profile: null | ProfileType,
  // newPost: string,
  posts: Array<MyPostType>
  status: string
}

export type ProfileType = {
  aboutMe: string,
  contacts: any,
  fullName: string,
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: any
  userId: number;
 }

export type MyPostType = {
  id: number
  message: string
  likesCounter: number
}

let initialState = {
  profile: null,
  // newPost: "",
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCounter: 5},
    {id: 2, message: 'It\'s my first post', likesCounter: 5}
  ],
  status: "",
}

const profileReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      console.log('добавим пост')
      let newPost = {id: new Date().getTime(), message: action.newPost, likesCounter: 0};
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    // case UPDATE_POST:
    //   return {
    //     ...state,
    //     newPost: action.newText
    //   }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS_PROFILE:
      console.log('stataus profile reduser')
      return {
        ...state,
        status: action.status
      }
    default:
      return state;
  }
}
export const sendPost = (newPost: string) => ({type:'ADD-POST', newPost} as const)
// export const updatePost = (newText: string) => ({type:'UPDATE-POST', newText} as const)
export const setUserProfile = (profile: null) => ({type:'SET-USER-PROFILE', profile} as const)
export const setStatusProfile = (status: string) => ({type:'SET-STATUS-PROFILE', status} as const)

export const getProfileInfo = (userId: number) => {
  return (dispatch: any) => {
    // {this.props.toggleLoader(!this.props.isLoading)}
    usersAPI.getProfileInfo(userId)
      .then((response) => {
        dispatch(setUserProfile(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        // this.props.toggleLoader(!this.props.isLoading)
        console.log(userId)
      });
  }
}

export const getUserStatus = (userId: number) => {
  console.log('getUserStatus')
  return (dispatch: any) => {
    // {this.props.toggleLoader(!this.props.isLoading)}
    profileAPI.getStatus(userId)
      .then((response) => {
        dispatch(setStatusProfile(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const updateUserStatus = (status: string) => {
  console.log('updateUserStatus')
  return (dispatch: any) => {
    // {this.props.toggleLoader(!this.props.isLoading)}
    profileAPI.updateStatus(status)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(setStatusProfile(status))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


export default profileReducer;