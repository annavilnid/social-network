import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className={style.nav}>
      <NavLink className={style.link} to="/profile">Profile</NavLink>
      <NavLink className={style.link} to="/dialogs">Messages</NavLink>
      <NavLink className={style.link} to="/news">News</NavLink>
      <NavLink className={style.link} to="/music">Music</NavLink>
      <NavLink className={style.link} to="/settings">Settings</NavLink>
    </nav>
  );
}