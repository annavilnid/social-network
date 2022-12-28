import React from "react";
import style from'./Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ActionType, ProfilePageType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {MapStatePropsType} from "./ProfileContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType, updateUserStatus} from "../../redux/profle-reduser";

type ProfilePropsType = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  // state: ProfilePageType
  // dispatch: (action: ActionType) => void
  // store: any
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={style.profile}>
      <img className={style.picture}
           src="https://img.freepik.com/free-vector/vector-illustration-mountains-ridge-morning-haze-panoramic-view_149326-1560.jpg?w=2000"
           alt="горы и деревья"/>
      <div>
        ava + description
      </div>
      <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
      <MyPostsContainer {...props}
        // store={props.store}
        // posts={props.state.posts}
        // newPost={props.state.newPost}
        // dispatch={props.dispatch}
      />
    </div>
  );
}