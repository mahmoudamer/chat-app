import React, { FC } from "react";
import { ChatHeadProps } from "../interfaces";
import "./index.scss";
import UserAvatar from "../../shared/UserAvater";
import { letterColors } from "../constants";

const ChatHead: FC<ChatHeadProps> = ({ chat, isActive, onClick }) => {
  return (
    <div
      className="chat-head-container"
      onClick={onClick}
      style={{
        borderColor: isActive
          ? letterColors[chat?.name?.charAt(0).toLocaleUpperCase()]
          : "transparent",
      }}
    >
      <div className="chat-head">
        <UserAvatar chat={chat} />
        <div className="chat-info">
          <h4 className="chat-name">{chat.name}</h4>
          <p className="chat-last-message">{chat.lastMessage.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHead;
