import React, { FC } from "react";
import { ChatMessageProps } from "../interfaces";
import "./index.scss";
import { MessageType } from "../enums";

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const USER_ID = 1;
  return (
    <div
      className={`chat-message ${
        message.user_id === USER_ID ? "my-message" : "other-message"
      }`}
    >
      {message.type === MessageType.Audio ? (
        <audio
          src={
            "blob:http://localhost:3001/925863e0-f194-4bf2-9b4e-6748b3b63222"
          }
        ></audio>
      ) : (
        <div>
          <div className="chat-message-content ">{message.content}</div>
          <div className="chat-message-timestamp">{message.timestamp}</div>
          <div className="file">{message.file}</div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
