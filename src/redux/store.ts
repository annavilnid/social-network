import profileReducer from "./profle-reduser";
import dialogsReducer from "./dialogs-reduser";
import sidebarReducer from "./sidebar-reduser"
import {addPostAC} from "./profle-reduser";
import {updatePostAC} from "./profle-reduser";
import {updateMessageAC} from "./dialogs-reduser";
import {sendMessageAC} from "./dialogs-reduser";
import {followAC, setUsersAC, unfollowAC} from "./users-reduser";

export type ActionType = ReturnType<typeof addPostAC> | ReturnType<typeof updatePostAC> | ReturnType<typeof updateMessageAC> | ReturnType<typeof sendMessageAC> |  ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>

export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebarPage: string
  usersPage: UsersPageType
}

export type ProfilePageType = {
  newPost: string,
  posts: Array<MyPostType>
}

export type DialogsPageType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
  newMessage: string,
}

export type UsersPageType = {
  users: UserType[] | []
}

export type MyPostType = {
  id: number
  message: string
  likesCounter: number
}

export type DialogType = {
  id: number
  name: string
}

export type MessageType = {
  id: number
  message: string
}

type UserType = {
  id: number
  avatar: string
  followed: boolean
  name: string
  message: string
  location: UserLocationType
}

type UserLocationType = {
  country: string
  city: string
}

export type StoreType = {
  _state: StateType
  _onChange: () => void
  subscriber: (callback: () => void) => void
  getState: () => StateType
  dispatch: (action: ActionType) => void
}

const store: StoreType = {
  _state: {
    profilePage: {
      newPost: "",
      posts: [
        {id: 1, message: 'Hi, how are you?', likesCounter: 5},
        {id: 2, message: 'It\'s my first post', likesCounter: 5}
      ],
    },
    dialogsPage: {
      messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I\'m fine'}
      ],
      dialogs: [
        {id: 1, name: 'Yury'},
        {id: 2, name: 'Anna'},
        {id: 3, name: 'Max'}
      ],
      newMessage: "",
    },
    sidebarPage: "",
    usersPage: {
      users: []
    },
  },
  _onChange() {
    console.log('State Changed');
  },
  subscriber(callback) {
    this._onChange = callback
  },

  getState() {
    return this._state
  },

  dispatch(action: ActionType) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);
    this._state.usersPage = sidebarReducer(this._state.usersPage, action);
    this._onChange();
  }
}

export default store