"use client";

import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function MicButton() {
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // pastiin client side

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Browser belum support Speech Recognition 😢");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "id-ID";
    recog.continuous = false;
    recog.interimResults = false;

    recog.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log("🎙️ Hasil:", text);
    };

    recog.onerror = (event) => {
      console.error("❌ Error:", event.error);
    };

    recog.onend = () => {
      console.log("✅ Perekaman selesai");
    };

    setRecognition(recog);
  }, []);

  const handleStart = () => {
    if (!recognition) {
      console.warn("Recognition belum siap");
      return;
    }
    recognition.start();
    console.log("🎧 Mulai mendengarkan...");
  };

  return (
    <button
      onClick={handleStart}
      className="rounded-full p-8 border-3 border-b-4 border-steal-200 flex items-center justify-center"
    >
      <Mic />
    </button>
  );
}
