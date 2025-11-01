"use client";

import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";

export default function MicButton({ onTextChange, onStartAsk }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const silenceTimer = useRef(null);
  const lastSpokeTime = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser kamu belum mendukung Speech Recognition 😔");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.continuous = false; // 🚫 jangan continuous
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("🎙️ Recording started");
      setIsRecording(true);
      lastSpokeTime.current = Date.now();
      onStartAsk?.();
      startSilenceWatcher(recognition);
    };

    recognition.onresult = (event) => {
      let liveText = "";
      for (let i = 0; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript;
      }
      onTextChange(liveText);
      lastSpokeTime.current = Date.now(); // update waktu terakhir ngomong
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log("🛑 Recording ended");
      setIsRecording(false);
      clearInterval(silenceTimer.current);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      clearInterval(silenceTimer.current);
    };
  }, [onTextChange, onStartAsk]);

  // ⏱️ Deteksi diam selama >2 detik, lalu stop recognition
  const startSilenceWatcher = (recognition) => {
    clearInterval(silenceTimer.current);
    silenceTimer.current = setInterval(() => {
      if (!lastSpokeTime.current) return;

      const elapsed = Date.now() - lastSpokeTime.current;
      if (elapsed > 2000) {
        console.log("😴 Tidak ada suara 2 detik — stop mic");
        recognition.stop();
        clearInterval(silenceTimer.current);
      }
    }, 300);
  };

  const handleClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      clearInterval(silenceTimer.current);
      setIsRecording(false);
    } else {
      onTextChange("");
      recognition.start();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full p-8 border-4 transition-all duration-300 ${
        isRecording
          ? "bg-red-500 border-red-700 text-white scale-110 shadow-lg"
          : "border-steal-200 hover:bg-steal-100"
      }`}
    >
      <Mic className={isRecording ? "animate-pulse" : ""} />
    </button>
  );
}
