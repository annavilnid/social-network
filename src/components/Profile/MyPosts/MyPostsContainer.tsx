import React, {ChangeEvent} from "react";
import {ActionType, MyPostType} from "../../../redux/store";
import {addPostAC, updatePostAC} from "../../../redux/profle-reduser"
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";

type MyPostsPropsType = {
  // newPost: string
  // posts: MyPostType[]
  // store: any
  // dispatch: (action: ActionType) => void
}

export const MyPostsContainer: React.FC <MyPostsPropsType> = (props) => {
  console.log(props)
  // let state = props.store.getState()

  // const addPost = () => {
  //   props.store.dispatch(addPostAC());
  // }


  // const onPostChange = (text: string) => {
  //   let action = updatePostAC(text)
  //   props.store.dispatch(action)
  // }

  return <StoreContext.Consumer>
    { store => {
        let state = store.getState();
        const addPost = () => {
          store.dispatch(addPostAC());
        };
        const onPostChange = (text: string) => {
        let action = updatePostAC(text)
          store.dispatch(action)
        };
        return <MyPosts
               updateNewPostText={onPostChange}
               addPost={addPost}
               posts={state.profilePage.posts}
               newPost={state.profilePage.newPost}/>
      }}
    </StoreContext.Consumer>

}