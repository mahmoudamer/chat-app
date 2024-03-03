import React, { useMemo } from "react";
import { ChatUserAvatar } from "../../ChatBubble/interfaces";
import { letterColors } from "../../ChatBubble/constants";
import "./index.scss";

const UserAvatar: React.FC<ChatUserAvatar> = ({ chat }) => {
  const { initial, color } = useMemo(() => {
    if (!chat) return { initial: "", color: "" };
    const firstChar = chat.name?.charAt(0).toUpperCase();
    return { initial: firstChar, color: letterColors[firstChar] };
  }, [chat]);

  return (
    <div className="avatar" style={{ backgroundColor: color }}>
      {initial}
    </div>
  );
};

export default UserAvatar;
