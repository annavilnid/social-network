import React from "react";
import {MessageType} from "../../../redux/store";

export const Message: React.FC <MessageType> = (props) => {
  return (
    <p>{props.message}</p>
  )
}

