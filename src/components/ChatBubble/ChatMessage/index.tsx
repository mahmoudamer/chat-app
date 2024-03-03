import React, { FC } from "react";
import { ChatMessageProps } from "../interfaces";
import "./index.scss";

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const USER_ID = 1;
  return (
    <div
      className={`chat-message ${
        message.user_id === USER_ID ? "my-message" : "other-message"
      }`}
    >
      <div>
        <div className="chat-message-content ">{message.content}</div>
        <div className="chat-message-timestamp">{message.timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
