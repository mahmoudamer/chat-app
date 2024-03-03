// @ts-nocheck
import React, { useState, useEffect, useRef, FC } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

const VoiceRecorder: FC<any> = ({ getRecording }) => {
  const [recordingState, setRecordingState] = useState("idle");
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const { t } = useTranslation();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          setRecordedBlob(e.data);
        }
      });

      mediaRecorderRef.current.start();
      setRecordingState("recording");
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecordingState("stopped");
    }
  };

  const resetRecording = () => {
    setRecordingState("idle");
    setRecordedBlob(null);
  };

  useEffect(() => {
    return () => {
      if (recordingState === "recording") {
        stopRecording();
      }
    };
  }, [recordingState]);

  useEffect(() => {
    if (recordedBlob) {
      getRecording(recordedBlob);
      resetRecording();
    }
  }, [recordedBlob]);

  return (
    <div>
      {recordingState === "idle" ? (
        <button className="record-button" onClick={startRecording}>
          {t("Record")}
        </button>
      ) : (
        <button className="send-voice-button" onClick={stopRecording}>
          {t("Send")}
        </button>
      )}
      {recordingState === "recording" && (
        <span className="status">{t("Recording...")}</span>
      )}
    </div>
  );
};

export default VoiceRecorder;
