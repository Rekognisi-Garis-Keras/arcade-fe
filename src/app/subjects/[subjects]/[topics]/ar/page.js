"use client";

import { useState } from "react";
import MicButton from "@/components/AR/ButtonMic";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import { LIST_LESSON_ASTRONOMY } from "@/constants/listLesson";

export default function AR() {
  const [liveText, setLiveText] = useState("");
  const [hasAsked, setHasAsked] = useState(false); // 🔥 tanda sudah mulai tanya jawab

  return (
    <div className="flex flex-col min-h-screen pb-25 px-5">
      <NavbarTopic title={`AR: ${LIST_LESSON_ASTRONOMY[0].title}`} />

      <div className="relative">
        <iframe
          src={`https://badzlan.is-a.dev/test-ar/?model=${LIST_LESSON_ASTRONOMY[0].model_url}`}
          width="100%"
          height="600px"
          title="AR"
          className="rounded-xl my-5"
          allow="camera; microphone; fullscreen; xr-spatial-tracking;"
        ></iframe>
        <div className="h-full w-full absolute top-0 left-0 bg-transparent"></div>
      </div>

      <div className="flex lg:flex-row flex-col-reverse items-center gap-y-3 gap-x-5">
        <div className="grow border-2 p-5 rounded-xl border-steel-200 border-b-4">
          <h1 className="font-bold text-lg mb-3">
            {hasAsked ? "Tanya Jawab" : "Deskripsi"}
          </h1>

          <p>
            {hasAsked
              ? `Kamu: "${liveText || "..."}"`
              : LIST_LESSON_ASTRONOMY[0].desc}
          </p>
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
