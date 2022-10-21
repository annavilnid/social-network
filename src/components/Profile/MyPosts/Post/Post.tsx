import React from "react";
import style from './Post.module.css'
import logo from './../../../../images/anna-logo-blue.svg'

type PostPropsType = {
  message: string,
  likesCounter?: number
}

export const Post: React.FC <PostPropsType> = (props) => {
  return (
    <div className={style.item}>
      <img className={style.avatar} src={logo} alt="aватар"/>
      <p>{props.message}</p>
      <span>{props.likesCounter}</span>
      <button>like</button>
      <button>dislike</button>
    </div>
  );
}