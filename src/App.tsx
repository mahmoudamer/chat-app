import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import ChatBubble from "./components/ChatBubble";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from "react-i18next";
import { MessageType } from "./components/ChatBubble/enums";

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
      <ChatBubble />
    </div>
  );
}

export default App;
