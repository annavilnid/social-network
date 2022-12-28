import React, {ChangeEvent, useRef} from "react";
import style from "../Dialogs/Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogsPageType, StateType} from "../../redux/store";
import {sendMessageAC} from "../../redux/dialogs-reduser";
// import {updateMessageAC} from "../../redux/dialogs-reduser"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/FormControl/FormControl";
import {maxLength50, required} from "../../utils/validation/validation";

type DialogsPropsType = {
  isAuth: boolean
  // state: DialogsPageType
  // dispatch: (action: ActionType) => void
  // updateNewMessage: (text: string) => void
  sendMessage: (message: string) => void
  dialogsPage: DialogsPageType

}

const DialogForm = (props: any) => {


  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={TextArea}
          name={'dialog'}
          placeholder={'Enter your message'}
          validate={[ required, maxLength50 ]}
      />
      </div>
      <div><button>add post</button></div>
    </form>
  );
}

const DialogReduxForm = reduxForm({
  // a unique name for the form
  form: 'dialog'
})(DialogForm)


export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const addMessage = (value: any) => {
    props.sendMessage(value.dialog)
  }

  const handleSubmit = (formData: any) => {
    addMessage(formData)
  }


  let dialogElement = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
  let messageElement = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)
  // let newPost = props.dialogsPage.newMessage;
  // let newPost = React.createRef<HTMLTextAreaElement>()

  // const addNewPost = () => {
  //   props.sendMessage();
  // }
  //
  // const changeNewPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   let message = e.currentTarget.value
  //   props.updateNewMessage(message);
  // }

  // export let AuthContainerRedirect = (props: any) => {
  //   if (!this.props.isAuth) return <Redirect to={'/login'}/>
  //   return <Dialogs {...props}/>
  // }

  // if (!props.isAuth) return <Redirect to={'/login'}/>;

  return (
    <div className={style.dialogs}>
      <nav className={style.dialogs_list}>
        {dialogElement}
      </nav>
      <div>
        <div>{messageElement}</div>
        <div><DialogReduxForm onSubmit={handleSubmit}/></div>
        {/*<div><textarea value={newPost}*/}
        {/*               placeholder='Enter your message'*/}
        {/*               onChange={changeNewPost}*/}
        {/*               ></textarea></div>*/}
        {/*<div><button onClick={addNewPost}>add post</button></div>*/}
      </div>
    </div>
  );
}
