import style from "../../Dialogs/Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {DialogType} from "../../../redux/store";

export const DialogItem: React.FC <DialogType> = (props) => {
  return (
    <NavLink className={style.dialog} to={`/dialogs/${props.id}`}>{props.name}</NavLink>
  )
}

