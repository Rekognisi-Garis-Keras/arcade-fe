"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MicButton from "@/components/AR/ButtonMic";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import ARCamera from "@/components/AR/ARCamera";
import { apiRequest } from "@/utils/api";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { ArrowLeft, MessageCircleQuestionMark } from "lucide-react";
import ARPageSkeleton from "./ARSkeleton";

export default function AR() {
  const router = useRouter();
  const { subjects: subjectSlug, topics: topicSlug } = useParams();

  const [liveText, setLiveText] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [answer, setAnswer] = useState("");

  const [loadingTopic, setLoadingTopic] = useState(true);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const [topic, setTopic] = useState(null);

  // Fetch Topic Details
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiRequest(
          `/subjects/${subjectSlug}/topics/${topicSlug}`,
          {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.status !== "success" || !res.data) {
          router.push("/not-found");
          return;
        }

        setTopic(res.data);

        // Text-to-speech
        if ("speechSynthesis" in window && res.data.desc) {
          const utterance = new SpeechSynthesisUtterance(res.data.desc);
          utterance.lang = "id-ID";
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        console.error("Failed to fetch topic:", err);
        router.push("/not-found");
      } finally {
        setLoadingTopic(false);
      }
    };

    fetchTopic();
    return () => window.speechSynthesis.cancel();
  }, [subjectSlug, topicSlug, router]);

  // Fetch AI Answer
  useEffect(() => {
    if (!hasAsked || liveText.trim() === "") return;

    const fetchAnswer = async () => {
      try {
        setLoadingAnswer(true);

        const token = localStorage.getItem("token");

        const res = await apiRequest(
          `/subjects/${subjectSlug}/topics/${topicSlug}/ai`,
          {
            method: "POST",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: { question: liveText },
          }
        );

        if (res.status === "success") {
          setAnswer(res.data.answer);

          // Text-to-Speech Jawaban
          if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(res.data.answer);
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
        setLoadingAnswer(false);
      }
    };

    fetchAnswer();
  }, [hasAsked, liveText, subjectSlug, topicSlug]);

  if (loadingTopic || !topic) return <ARPageSkeleton />;

  return (
    <div className="flex flex-col min-h-screen pb-25 px-5">
      <NavbarTopic title={`AR: ${topic.title}`} slug={subjectSlug} />

      <ARCamera
        model={topic.model_url}
        marker={topic.marker_img_url}
        scale={topic.scale_model}
      />

      <div className="flex lg:flex-row flex-col-reverse items-center gap-y-3 gap-x-5">
        <div className="grow border-2 p-5 rounded-xl border-steel-200 border-b-4">
          <h1 className="font-bold text-lg mb-3">
            {hasAsked ? "Tanya Jawab" : "Deskripsi"}
          </h1>

          {!hasAsked ? (
            <p>{topic.desc}</p>
          ) : (
            <div className="space-y-2">
              <p>
                <span className="font-bold">Pertanyaan:</span>{" "}
                {liveText || "..."}
              </p>
              <p>
                <span className="font-bold">Jawaban:</span>{" "}
                {loadingAnswer
                  ? "Aku mikir dulu ya..."
                  : answer || "Belum ada jawaban."}
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
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full my-5">
        <Link href={`/subjects/${subjectSlug}/${topicSlug}`} className="flex-1">
          <Button variant="secondary" className="w-full gap-2 cursor-pointer">
            <ArrowLeft size={18} />
            Kembali ke Topik
          </Button>
        </Link>
        <Link
          href={`/subjects/${subjectSlug}/${topicSlug}/quiz`}
          className="flex-1"
        >
          <Button variant="primary" className="w-full gap-2 cursor-pointer">
            <MessageCircleQuestionMark size={18} />
            Quiz {topic.title}
          </Button>
        </Link>
      </div>
    </div>
  );
}
