import React, {ChangeEvent} from "react";
import {ActionType, MyPostType, StateType} from "../../../redux/store";
import {addPostAC, updatePostAC} from "../../../redux/profle-reduser"
import {connect} from "react-redux";
import {sendMessageAC, updateMessageAC} from "../../../redux/dialogs-reduser";
import {Dialogs} from "../../Dialogs/Dialogs";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";



type MyPostsPropsType = {
  // newPost: string
  // posts: MyPostType[]
  // store: any
  // dispatch: (action: ActionType) => void
}

let mapStateToProps  = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPost: state.profilePage.newPost
  }
}

let mapDispatchToProps  = (dispatch: (action: ActionType) => void) => {
  return {
    addPost: () => {
      dispatch(addPostAC())
    },
    updateNewPostText: (text: string) => {
      let action = updatePostAC(text)
      dispatch(action)
    }
  }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
