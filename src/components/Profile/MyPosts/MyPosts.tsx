import React, {ChangeEvent} from "react";
import style from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ActionType, MyPostType} from "../../../redux/store";
import {addPostAC} from "../../../redux/profle-reduser"
import {updatePostAC} from "../../../redux/profle-reduser"

type MyPostsPropsType = {
  newPost?: string
  posts: MyPostType[]
  updateNewPostText: (text: string) => void
  addPost: () => void
}

export const MyPosts: React.FC <MyPostsPropsType> = (props) => {
  const PostElement = props.posts.map((p) => <Post key={p.id} message={p.message} likesCounter={p.likesCounter} />)

  // let newPostElement = React.createRef<HTMLTextAreaElement>()

  const onAddPost = () => {
    props.addPost()
  }

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    props.updateNewPostText(text)
  }

  return (
    <div>
      <h3>My posts</h3>
      <div>
        <textarea onChange={onPostChange} value={props.newPost}/>
        <button onClick={onAddPost}>Add post</button>
        <button>Remove post</button>
      </div>
      <div className={style.posts}>
        {PostElement}
      </div>
    </div>
  );
}