import React, {ChangeEvent} from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogsPageType, StateType} from "../../redux/store";
import {sendMessageAC} from "../../redux/dialogs-reduser";
import {updateMessageAC} from "../../redux/dialogs-reduser";
import {AppStateType} from "../../redux/redux-store";
import {MyPosts} from "../Profile/MyPosts/MyPosts"
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

type DialogsPropsType = {
  // state: DialogsPageType
  // dispatch: (action: ActionType) => void
  // store: any
}


let mapStateToProps  = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps  = (dispatch: (action: ActionType) => void) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageAC());
    },
    updateNewMessage: (message: string) => {
      dispatch(updateMessageAC(message));
    }
  }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


