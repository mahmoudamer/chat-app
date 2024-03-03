import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import ChatBubble from "./components/ChatBubble";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from "react-i18next";
import { MessageType } from "./components/ChatBubble/enums";

// Replace with your actual language code and file paths
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require("./localization/en.json"),
    },
    ar: {
      translation: require("./localization/ar.json"),
    },
  },
  lng: "en",
});
const chats = [
  {
    id: 1,
    name: "John Doe",
    messages: [
      {
        id: 1,
        sender: "John Doe",
        timestamp: "2021-01-01T00:00:00Z",
        content: "asdf asdf asfd ",
        user_id: 1,
        type: MessageType.Text,
      },
      {
        id: 1,
        sender: "John Doe",
        timestamp: "2021-01-01T00:00:00Z",
        content: "asdf asdf asfd ",
        user_id: 2,
        type: MessageType.Text,
      },
      {
        id: 1,
        sender: "John Doe",
        timestamp: "2021-01-01T00:00:00Z",
        content: "asdf asdf asfd ",
        user_id: 2,
        type: MessageType.Text,
      },
      {
        id: 1,
        sender: "John Doe",
        timestamp: "2021-01-01T00:00:00Z",
        content: "asdf asdf asfd ",
        user_id: 1,
        type: MessageType.Text,
      },
      {
        id: 1,
        sender: "John Doe",
        timestamp: "2021-01-01T00:00:00Z",
        content: "asdf asdf asfd ",
        user_id: 1,
        type: MessageType.Text,
      },
    ],
    lastMessage: {
      id: 1,
      sender: "John Doe",
      timestamp: "2021-01-01T00:00:00Z",
      content: "Hello, World!",
      user_id: 1,
      type: MessageType.Text,
    },
  },
];

function App() {
  const { t } = useTranslation();
  const handleLanguageChange = () => {
    const lang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  };
  return (
    <div className={`app ${i18n.language === "ar" ? "rtl" : ""}`}>
      <div className="navbar">
        <h3>{t("title")}</h3>

        <div className="lang-switcher" onClick={() => handleLanguageChange()}>
          {i18n.language === "en" ? "عربي" : "English"}
        </div>
      </div>
      <ChatBubble chats={chats} />
    </div>
  );
}

export default App;
