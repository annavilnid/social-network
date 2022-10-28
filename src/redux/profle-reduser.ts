import {ActionType} from "./store";
import {UserType} from "./users-reduser";

const ADD_POST = 'ADD-POST';
const UPDATE_POST = 'UPDATE-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

export type initialStateType = {
  profile: null | ProfileType,
  newPost: string,
  posts: Array<MyPostType>
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
  newPost: "",
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCounter: 5},
    {id: 2, message: 'It\'s my first post', likesCounter: 5}
  ],
}

const profileReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      console.log('add')
      let newPost = {id: new Date().getTime(), message: state.newPost, likesCounter: 0};
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPost: ''
      }
    case UPDATE_POST:
      return {
        ...state,
        newPost: action.newText
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state;
  }
}
export const addPost = () => ({type:'ADD-POST'} as const)
export const updatePost = (newText: string) => ({type:'UPDATE-POST', newText} as const)
export const setUserProfile = (profile: null) => ({type:'SET-USER-PROFILE', profile} as const)

export default profileReducer;