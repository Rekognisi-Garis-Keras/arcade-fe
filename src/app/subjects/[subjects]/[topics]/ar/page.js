"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MicButton from "@/components/AR/ButtonMic";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import { LIST_LESSON_ASTRONOMY } from "@/constants/listLesson";
import ARCamera from "@/components/AR/ARCamera";

export default function AR() {
   const [liveText, setLiveText] = useState("");
   const [hasAsked, setHasAsked] = useState(false);
   const [answer, setAnswer] = useState("");
   const [loading, setLoading] = useState(false);

   const params = useParams();
   const subject = params.subjects;
   const topic = params.topics;

   useEffect(() => {
      const textToSpeak = LIST_LESSON_ASTRONOMY[0].desc;

      if (textToSpeak && "speechSynthesis" in window) {
         const utterance = new SpeechSynthesisUtterance(textToSpeak);
         utterance.lang = "id-ID";
         window.speechSynthesis.speak(utterance);

         return () => {
            window.speechSynthesis.cancel();
         };
      }
   }, []);

   useEffect(() => {
      if (hasAsked && liveText.trim() !== "") {
         const fetchAnswer = async () => {
            try {
               setLoading(true);
               const res = await fetch(`https://api-arcade.vercel.app/subjects/${subject}/topics/${topic}/ai`, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                     Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkJ1enoiLCJlbWFpbCI6ImJ1enpAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NjIwNzQxMzIsImV4cCI6MTc2MjE2MDUzMn0.ZoYDnOBIKubr1HRjL9z9uM4DgFs5BfbF8dekTjYQ18E",
                  },
                  body: JSON.stringify({ question: liveText }),
               });

               const data = await res.json();

               if (data.status === "success") {
                  setAnswer(data.data.answer);

                  if ("speechSynthesis" in window) {
                     const utterance = new SpeechSynthesisUtterance(data.data.answer);
                     utterance.lang = "id-ID";
                     window.speechSynthesis.speak(utterance);
                  }
               } else {
                  setAnswer("Maaf, terjadi kesalahan saat mendapatkan jawaban.");
               }
            } catch (error) {
               console.error(error);
               setAnswer("Gagal menghubungi server.");
            } finally {
               setLoading(false);
            }
         };

         fetchAnswer();
      }
   }, [hasAsked, liveText, subject, topic]);

   return (
      <div className="flex flex-col min-h-screen pb-25 px-5">
         <NavbarTopic title={`AR: ${LIST_LESSON_ASTRONOMY[0].title}`} />

         <ARCamera title={`AR: ${LIST_LESSON_ASTRONOMY[0].desc}`} />

         <div className="flex lg:flex-row flex-col-reverse items-center gap-y-3 gap-x-5">
            <div className="grow border-2 p-5 rounded-xl border-steel-200 border-b-4">
               <h1 className="font-bold text-lg mb-3">{hasAsked ? "Tanya Jawab" : "Deskripsi"}</h1>

               {!hasAsked ? (
                  <p>{LIST_LESSON_ASTRONOMY[0].desc}</p>
               ) : (
                  <div className="space-y-2">
                     <p>
                        <span className="font-bold">Kamu:</span> {liveText || "..."}
                     </p>
                     <p>
                        <span className="font-bold">ARmin:</span> {loading ? "Sedang menjawab..." : answer || "Belum ada jawaban."}
                     </p>
                  </div>
               )}
            </div>

            <div className="flex h-[100px] w-[100px] items-center justify-center">
               <MicButton
                  onTextChange={setLiveText}
                  onStartAsk={() => {
                     setHasAsked(true);
                     setAnswer("");
                  }}
               />
            </div>
         </div>
      </div>
   );
}
