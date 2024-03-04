import { MessageType } from "../enums";

export interface Chat {
  id: number;
  name: string;
  lastMessage: Message;
  messages: Message[];
}

export interface Message {
  id: number;
  sender: string;
  timestamp: string;
  content: string;
  user_id: number;
  type: MessageType;
  file?: string;
  audio?: string;
}

export interface ChatBubbleProps {
  chats: Chat[];
}

export interface ChatHeadProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}
export interface ChatUserAvatar {
  chat: Chat;
}

export interface ChatMessageProps {
  message: Message;
}

export interface FileInterface {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
}
