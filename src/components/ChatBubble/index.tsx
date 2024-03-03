import { useState, FC, useEffect } from "react";
import ChatHead from "./ChatHead";
import { ChatBubbleProps } from "./interfaces";
import ChatMessage from "./ChatMessage";
import "./index.scss";
import UserAvatar from "./../shared/UserAvater/index";
import { useTranslation } from "react-i18next";
import FileUploader from "../shared/FileUploader";
import VoiceRecorder from "../shared/VoiceRecorder";
// import VoiceRecorder from "../shared/VoiceRecorder";

const ChatBubble: FC<ChatBubbleProps> = ({ chats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (event: any) => {
      console.log("event", event);
      setIsOpen(event.matches);
    };
    handleResize(mediaQuery);
    mediaQuery.addListener(handleResize);
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleOpenChat = (chat: any) => {
    setSelectedChatId(chat.id);
    setSelectedChat(chat);
  };
  const getRecording = (recording: any) => {
    setRecordedBlob(recording);
  };

  const renderedChats = chats.map((chat) => (
    <ChatHead
      key={chat.id}
      chat={chat}
      isActive={chat.id === selectedChatId}
      onClick={() => handleOpenChat(chat)}
    />
  ));

  const renderedMessages = chats
    .find((chat) => chat.id === selectedChatId)
    ?.messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ));

  return (
    <>
      <button
        className={`chat-icon ${isOpen ? "open-head" : ""}`}
        onClick={toggleOpen}
      ></button>
      <div className={`chat-bubble ${isOpen ? "open" : ""}`}>
        {isOpen && <div className="chat-list">{renderedChats}</div>}
        {isOpen && selectedChatId && (
          <div className="chat-content">
            <div className="chat-content-user-info">
              <UserAvatar chat={selectedChat} />
              <div className="chat-content-user-info-name">
                {selectedChat?.name}
              </div>
            </div>
            <div className="messages-container">{renderedMessages}</div>
            <div className="controls-container">
              <div className="controls">
                <input
                  className="input-text"
                  type="text"
                  placeholder={t("Type your message...")}
                />
                <div className="buttons-container">
                  <button className="send-button">{t("Send")}</button>
                  <div className="upload-and-record-container">
                    <FileUploader />
                    <VoiceRecorder getRecording={getRecording} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBubble;
