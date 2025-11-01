"use client";

import { useState, useEffect } from "react";
import MicButton from "@/components/AR/ButtonMic";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import { LIST_LESSON_ASTRONOMY } from "@/constants/listLesson";
import ARCamera from "@/components/AR/ARCamera";

export default function AR() {
  const [liveText, setLiveText] = useState("");
  const [hasAsked, setHasAsked] = useState(false); // 🔥 tanda sudah mulai tanya jawab

  // 👇 --- TAMBAHKAN BLOK INI --- 👇
  useEffect(() => {
    // 1. 📝 Ambil teks deskripsinya
    const textToSpeak = LIST_LESSON_ASTRONOMY[0].desc;

    // 2. 🛡️ Cek dulu kalo teksnya ada & browsernya support
    if (textToSpeak && "speechSynthesis" in window) {
      // 3. 🗣️ Bikin "objek" suaranya
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // 4. 🇮🇩 Set bahasanya (penting biar aksennya pas!)
      utterance.lang = "id-ID";

      // 5. 🚀 Suruh browser ngomong
      window.speechSynthesis.speak(utterance);

      // 6. 🧹 (Opsional tapi bagus) Bersihin kalo komponennya di-unmount
      // Ini biar kalo kamu pindah halaman pas dia lagi ngomong, suaranya berenti.
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []); // 👈 Array kosong ini PENTING! Artinya "jalanin sekali pas load"
  // 👆 --- SAMPAI SINI --- 👆

  return (
    <div className="flex flex-col min-h-screen pb-25 px-5">
      <NavbarTopic title={`AR: ${LIST_LESSON_ASTRONOMY[0].title}`} />

      <ARCamera title={`AR: ${LIST_LESSON_ASTRONOMY[0].desc}`} />

      <div className="flex lg:flex-row flex-col-reverse items-center gap-y-3 gap-x-5">
        <div className="grow border-2 p-5 rounded-xl border-steel-200 border-b-4">
          <h1 className="font-bold text-lg mb-3">
            {hasAsked ? "Tanya Jawab" : "Deskripsi"}
          </h1>

          {/* <p>
            {hasAsked
              ? `Kamu: "${liveText || "..."}"`
              : LIST_LESSON_ASTRONOMY[0].desc}
          </p> */}
          {hasAsked ? (
            <p>
              <span className="font-bold">Kamu: </span>
              {liveText || "..."}
            </p>
          ) : (
            <p>{LIST_LESSON_ASTRONOMY[0].desc}</p>
          )}
        </div>

        <div className="flex h-[100px] w-[100px] items-center justify-center">
          <MicButton
            onTextChange={setLiveText}
            onStartAsk={() => setHasAsked(true)} // 🔥 aktifkan mode Tanya Jawab
          />
        </div>
      </div>
    </div>
  );
}
