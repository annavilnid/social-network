import React, {ChangeEvent} from "react";
import {ActionType, MyPostType, StateType} from "../../../redux/store";
import {sendPost} from "../../../redux/profle-reduser"
import {connect} from "react-redux";
import {sendMessageAC} from "../../../redux/dialogs-reduser";
import {Dialogs} from "../../Dialogs/Dialogs";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps  = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    // newPost: state.profilePage.newPost
  }
}

// let mapDispatchToProps  = (dispatch: (action: ActionType) => void) => {
//   return {
//     sendPost: () => {
//       dispatch(sendPostAC())
//     },
//     updatePost: (text: string) => {
//       let action = updatePostAC(text)
//       dispatch(action)
//     }
//   }
// }

export const MyPostsContainer = connect(mapStateToProps, {sendPost})(MyPosts);
