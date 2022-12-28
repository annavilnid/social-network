import React from "react";
import style from "./Header.module.css";
import logo from "../../images/anna-logo-blue.svg";
import {NavLink} from "react-router-dom";
import s from "../Header/Header.module.css";
import {dataType, initialStateType} from "../../redux/auth-reduser";
import {UserType} from "../../redux/users-reduser";

type HeaderComponentPropsType = {
  login: string | null
  isAuth: boolean
  signOut: () => void
}

export const Header = (props: HeaderComponentPropsType) => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={s.login}>
          { props.isAuth ? <div>{props.login}<button onClick={props.signOut}>logout</button></div>
            : <NavLink to='/login'>Login</NavLink>}
        </div>
        <img className={style.front} src={logo} alt="logo"/>
        <img className={style.back} src={logo} alt="logo"/>
      </div>
    </header>
  );
}