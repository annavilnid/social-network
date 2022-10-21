import React, {ChangeEvent} from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogsPageType} from "../../redux/store";
import {sendMessageAC} from "../../redux/dialogs-reduser";
import {updateMessageAC} from "../../redux/dialogs-reduser"
import {MyPosts} from "../Profile/MyPosts/MyPosts"
import {Dialogs} from "./Dialogs";
import StoreContext from "../../StoreContext";

type DialogsPropsType = {
  // state: DialogsPageType
  // dispatch: (action: ActionType) => void
  // store: any
}

export const DialogsContainer: React.FC<DialogsPropsType> = (props) => {
  return <StoreContext.Consumer>
    { store => {
      const onNewMessageClick = () => {
        store.dispatch(sendMessageAC());
      }
      const onNewMessageChange = (message: string) => {
        store.dispatch(updateMessageAC(message));
      }
      return <Dialogs updateNewMessage={onNewMessageChange}
                      sendMessage={onNewMessageClick}
                      dialogsPage={store.getState().dialogsPage}/>
    }}
  </StoreContext.Consumer>
}
