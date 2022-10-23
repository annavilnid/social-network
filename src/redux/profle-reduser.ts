import {ActionType, ProfilePageType} from "./store";

const ADD_POST = 'ADD-POST';
const UPDATE_POST = 'UPDATE-POST';

let initialState = {
  newPost: "",
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCounter: 5},
    {id: 2, message: 'It\'s my first post', likesCounter: 5}
  ],
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionType): ProfilePageType => {
  switch (action.type) {
    case ADD_POST:
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
    default:
      return state;
  }
}
export const addPostAC = () => ({type:'ADD-POST'} as const)
export const updatePostAC = (newText:string) => ({type:'UPDATE-POST', newText} as const)

export default profileReducer;