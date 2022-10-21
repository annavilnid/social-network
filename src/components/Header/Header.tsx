import React from "react";
import style from './Header.module.css'
import logo from "../../images/anna-logo-blue.svg"

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <img className={style.front} src={logo} alt="logo"/>
        <img className={style.back} src={logo} alt="logo"/>
      </div>
    </header>
  );
}