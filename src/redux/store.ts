import profileReducer, {ProfileType, setStatusProfile, setUserProfile} from "./profle-reduser";
import dialogsReducer from "./dialogs-reduser";
import sidebarReducer from "./sidebar-reduser"
import {sendPost} from "./profle-reduser";
// import {updatePost} from "./profle-reduser";
// import {updateMessageAC} from "./dialogs-reduser";
import {sendMessageAC} from "./dialogs-reduser";
import {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers, toggleFollowingProgress,
  toggleLoader,
  unfollowSuccess
} from "./users-reduser";
import {setAuthUserData} from "./auth-reduser";
import {initializedSuccess} from "./app-reduser";

export type ActionType = ReturnType<typeof sendPost> | ReturnType<typeof sendMessageAC> |  ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess> | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleLoader> | ReturnType<typeof setUserProfile> | ReturnType<typeof setAuthUserData> | ReturnType<typeof toggleFollowingProgress> | ReturnType<typeof setStatusProfile> | ReturnType<typeof initializedSuccess>
// ReturnType<typeof updateMessageAC>
// ReturnType<typeof updatePost>
export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebarPage: string
  usersPage: UsersPageType
}

export type ProfilePageType = {
  profile: null | ProfileType,
  newPost: string,
  posts: Array<MyPostType>
  status: string
}

export type DialogsPageType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
  // newMessage: string,
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
      profile: null,
      newPost: "",
      posts: [
        {id: 1, message: 'Hi, how are you?', likesCounter: 5},
        {id: 2, message: 'It\'s my first post', likesCounter: 5}
      ],
      status: "",
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
      // newMessage: "",
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
    // this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);
    this._state.usersPage = sidebarReducer(this._state.usersPage, action);
    this._onChange();
  }
}

export default store