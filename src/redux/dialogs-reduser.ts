import {ActionType, DialogsPageType} from "./store";

const UPDATE_MESSAGE = 'UPDATE-MESSAGE';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  messages: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'I\'m fine'}
  ],
  dialogs: [
    {id: 1, name: 'Yury'},
    {id: 2, name: 'Anna'},
    {id: 3, name: 'Max'}
  ]
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionType): DialogsPageType => {
  switch (action.type) {
    // case UPDATE_MESSAGE:
    //   return {
    //     ...state,
    //     newMessage: action.newMessage
    //   }
    case SEND_MESSAGE:
      let body = action.newMessage;
      return {
        ...state,
        messages: [...state.messages, {id: 4, message: body}]
      }
    default:
      return state
  }
}

// export const updateMessageAC = (newMessage:string) => ({type:'UPDATE-MESSAGE',newMessage} as const)
export const sendMessageAC = (newMessage: string) => ({type:'SEND-MESSAGE', newMessage} as const)

export default dialogsReducer;