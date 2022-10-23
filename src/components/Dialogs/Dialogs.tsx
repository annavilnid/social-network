import React, {ChangeEvent, useRef} from "react";
import style from "../Dialogs/Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogsPageType, StateType} from "../../redux/store";
import {sendMessageAC} from "../../redux/dialogs-reduser";
import {updateMessageAC} from "../../redux/dialogs-reduser"
import {connect} from "react-redux";

type DialogsPropsType = {
  // state: DialogsPageType
  // dispatch: (action: ActionType) => void
  updateNewMessage: (text: string) => void
  sendMessage: () => void
  dialogsPage: DialogsPageType
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {


  let dialogElement = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
  let messageElement = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)
  let newPost = props.dialogsPage.newMessage;
  // let newPost = React.createRef<HTMLTextAreaElement>()

  const addNewPost = () => {
    props.sendMessage();
  }

  const changeNewPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let message = e.currentTarget.value
    props.updateNewMessage(message);
  }

  return (
    <div className={style.dialogs}>
      <nav className={style.dialogs_list}>
        {dialogElement}
      </nav>
      <div>
        <div>{messageElement}</div>
        <div><textarea value={newPost}
                       placeholder='Enter your message'
                       onChange={changeNewPost}
                       ></textarea></div>
        <div><button onClick={addNewPost}>add post</button></div>
      </div>
    </div>
  );
}
