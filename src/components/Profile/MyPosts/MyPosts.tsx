import React, {ChangeEvent} from "react";
import style from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ActionType, MyPostType} from "../../../redux/store";
import {addPost} from "../../../redux/profle-reduser"
import {updatePost} from "../../../redux/profle-reduser"

type MyPostsPropsType = {
  newPost?: string
  posts: MyPostType[]
  updatePost: (text: string) => void
  addPost: () => void
}

export const MyPosts: React.FC <MyPostsPropsType> = (props) => {
  console.log(props)
  const PostElement = props.posts.map((p) => <Post key={p.id} message={p.message} likesCounter={p.likesCounter} />)

  // let newPostElement = React.createRef<HTMLTextAreaElement>()

  const onAddPost = () => {
    props.addPost()
  }

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    props.updatePost(text)
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