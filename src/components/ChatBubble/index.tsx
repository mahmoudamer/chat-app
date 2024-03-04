import { useState, FC, useEffect, useRef } from "react";
import ChatHead from "./ChatHead";
import { ChatBubbleProps } from "./interfaces";
import ChatMessage from "./ChatMessage";
import "./index.scss";
import UserAvatar from "./../shared/UserAvater/index";
import { useTranslation } from "react-i18next";
import FileUploader from "../shared/FileUploader";
import VoiceRecorder from "../shared/VoiceRecorder";
import { chats } from "../data";
import { MessageType } from "./enums";
const ChatBubble: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [recordedURL, setRecordedURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const { t } = useTranslation();
  const scrollableDivRef = useRef(null);

  const handleInputChange = (event: any) => {
    setSelectedFile(event?.target.files[0]);
  };

  useEffect(() => {
    scrollToBottom(scrollableDivRef);
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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    handleOpenChat(chats[0]);
  };
  const handleOpenChat = (chat: any) => {
    setSelectedChatId(chat.id);
    setSelectedChat(chat);
  };
  const getRecording = async (recording: any) => {
    const url = await URL.createObjectURL(recording);
    setRecordedURL(url);
    sendVoiceMessage();
  };

  const sendMessage = () => {
    const toBeSentMessage = {
      id: 1,
      sender: "Me",
      timestamp: new Date().toISOString(),
      content: newMessage,
      user_id: 1,
      type: selectedFile ? MessageType.File : MessageType.Text,
      file: selectedFile?.name,
    };
    selectedChat.messages.push(toBeSentMessage);
    setNewMessage("");
    setSelectedFile(null);
    scrollToBottom(scrollableDivRef);
  };
  const scrollToBottom = (elRef: any) => {
    if (elRef.current) elRef.current.scrollTop = elRef.current.scrollHeight;
  };
  const sendVoiceMessage = () => {
    const toBeSentMessage = {
      id: 1,
      sender: "Me",
      timestamp: new Date(),
      content: "",
      user_id: 1,
      type: MessageType.Audio,
      audio: recordedURL,
    };
    console.log("toBeSentMessage", toBeSentMessage);
    selectedChat.messages.push(toBeSentMessage);
    setRecordedURL(null);
    scrollToBottom(scrollableDivRef);
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
            <div ref={scrollableDivRef} className="messages-container">
              {renderedMessages}
            </div>
            <div className="controls-container">
              <div className="controls">
                <input
                  className="input-text"
                  type="text"
                  placeholder={t("Type your message...")}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="buttons-container">
                  <button className="send-button" onClick={sendMessage}>
                    {t("Send")}
                  </button>
                  <div className="upload-and-record-container">
                    <FileUploader
                      handleInputChange={handleInputChange}
                      setSelectedFile={setSelectedFile}
                      selectedFile={selectedFile}
                    />
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
