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
  ],
  newMessage: "",
}

const dialogsReduser = (state: DialogsPageType = initialState, action: ActionType): DialogsPageType => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      state.newMessage = action.newMessage;
      return state
    case SEND_MESSAGE:
      let body = state.newMessage;
      state.messages.push({id: 4, message: body})
      state.newMessage = '';
      return state
    default:
      return state
  }
}

export const updateMessageAC = (newMessage:string) => ({type:'UPDATE-MESSAGE',newMessage} as const)
export const sendMessageAC = () => ({type:'SEND-MESSAGE'} as const)

export default dialogsReduser;