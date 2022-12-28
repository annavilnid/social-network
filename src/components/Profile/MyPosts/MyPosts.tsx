import React, {ChangeEvent} from "react";
import style from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ActionType, MyPostType} from "../../../redux/store";
import {sendPost} from "../../../redux/profle-reduser"
// import {updatePost} from "../../../redux/profle-reduser"
import {Field, reduxForm} from "redux-form";
import {required, maxLength30} from "../../../utils/validation/validation";
import {TextArea} from "../../common/FormControl/FormControl";

type MyPostsPropsType = {
  newPost?: string
  posts: MyPostType[]
  // updatePost: (text: string) => void
  sendPost: (post: string) => void
}

const MyPostsForm = (props: any) => {
  // const onsendPost = () => {
  //   props.sendPost()
  // }
  //
  // const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   let text = e.currentTarget.value
  //   props.updatePost(text)
  // }

  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name={"myPost"}
        component={TextArea}
        value={props.newPost}
        validate={[ required, maxLength30 ]}
      />
      <button>Add post</button>
      <button>Remove post</button>
    </form>
  );
}

const MyPostsReduxForm = reduxForm({
  // a unique name for the form
  form: 'myPost'
})(MyPostsForm)


export const MyPosts: React.FC <MyPostsPropsType> = (props) => {

  const PostElement = props.posts.map((p) => <Post key={p.id} message={p.message} likesCounter={p.likesCounter} />)

  // let newPostElement = React.createRef<HTMLTextAreaElement>()

  // const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   let text = e.currentTarget.value
  //   props.updatePost(text)
  // }

    const addPost = (value: any) => {
      console.log(value)
      props.sendPost(value.myPost)
    }


    const handleSubmit = (formData: any) => {
      addPost(formData)
    }

  return (
    <div>
      <h3>My posts</h3>
      <MyPostsReduxForm
        onSubmit={handleSubmit}
        // newPost={props.newPost}
        // updatePost={props.updatePost}
        // sendPost={props.sendPost}
      />
      {/*<div>*/}
      {/*  <textarea onChange={onPostChange} value={props.newPost}/>*/}
      {/*  <button onClick={onsendPost}>Add post</button>*/}
      {/*  <button>Remove post</button>*/}
      {/*</div>*/}
      <div className={style.posts}>
        {PostElement}
      </div>
    </div>
  );
}