"use client";

import { useState } from "react";
import QuizFooter from "./QuizFooter";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

export default function QuizPage() {
  const quizzes = [
    {
      id: 1,
      uuid: "019a09bc-a6a7-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question: "Planet manakah yang dikenal sebagai 'planet merah'?",
      options: [
        { id: "a", text: "Mars" },
        { id: "b", text: "Venus" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Saturnus" },
      ],
      correct_answer: "a",
      explanation:
        "🌕 Mars disebut 'planet merah' karena permukaannya mengandung banyak zat besi oksida (karat) yang memberi warna merah.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 2,
      uuid: "019a09bc-a6a8-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question: "Planet terbesar di tata surya adalah...",
      options: [
        { id: "a", text: "Bumi" },
        { id: "b", text: "Saturnus" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Neptunus" },
      ],
      correct_answer: "c",
      explanation:
        "🌀 Jupiter adalah planet terbesar di tata surya, massanya lebih dari dua kali gabungan semua planet lainnya.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 3,
      uuid: "019a09bc-a6a9-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question: "Planet terdekat dengan Matahari adalah...",
      options: [
        { id: "a", text: "Venus" },
        { id: "b", text: "Merkurius" },
        { id: "c", text: "Bumi" },
        { id: "d", text: "Mars" },
      ],
      correct_answer: "b",
      explanation:
        "☀️ Merkurius adalah planet terdekat dengan Matahari dan juga planet terkecil di tata surya.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 4,
      uuid: "019a09bc-a6b0-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question:
        "Planet manakah yang memiliki cincin terbesar dan paling mencolok?",
      options: [
        { id: "a", text: "Saturnus" },
        { id: "b", text: "Uranus" },
        { id: "c", text: "Neptunus" },
        { id: "d", text: "Jupiter" },
      ],
      correct_answer: "a",
      explanation:
        "💫 Saturnus terkenal dengan cincin es dan debunya yang besar dan jelas terlihat dari teleskop.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 5,
      uuid: "019a09bc-a6b1-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question:
        "Planet apakah yang dikenal memiliki satu-satunya kehidupan yang diketahui?",
      options: [
        { id: "a", text: "Venus" },
        { id: "b", text: "Mars" },
        { id: "c", text: "Bumi" },
        { id: "d", text: "Uranus" },
      ],
      correct_answer: "c",
      explanation:
        "🌍 Hingga saat ini, hanya Bumi yang memiliki air dalam jumlah besar dan atmosfer yang mendukung kehidupan.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 6,
      uuid: "019a09bc-a6b2-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question:
        "Planet manakah yang berputar dengan arah berlawanan dibandingkan planet lain?",
      options: [
        { id: "a", text: "Venus" },
        { id: "b", text: "Mars" },
        { id: "c", text: "Neptunus" },
        { id: "d", text: "Saturnus" },
      ],
      correct_answer: "a",
      explanation:
        "🔄 Venus berputar dari timur ke barat, kebalikan dari sebagian besar planet lain.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 7,
      uuid: "019a09bc-a6b3-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question:
        "Planet apakah yang memiliki hari terpanjang (rotasi paling lambat)?",
      options: [
        { id: "a", text: "Venus" },
        { id: "b", text: "Bumi" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Mars" },
      ],
      correct_answer: "a",
      explanation:
        "🕰️ Venus butuh sekitar 243 hari Bumi untuk berotasi sekali—lebih lama dari waktu revolusinya mengelilingi Matahari.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 8,
      uuid: "019a09bc-a6b4-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question: "Planet apakah yang dikenal memiliki bintik merah besar?",
      options: [
        { id: "a", text: "Mars" },
        { id: "b", text: "Saturnus" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Uranus" },
      ],
      correct_answer: "c",
      explanation:
        "🌪️ Bintik merah besar di Jupiter adalah badai raksasa yang telah berlangsung selama ratusan tahun.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 9,
      uuid: "019a09bc-a6b5-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question: "Planet mana yang paling jauh dari Matahari?",
      options: [
        { id: "a", text: "Uranus" },
        { id: "b", text: "Neptunus" },
        { id: "c", text: "Pluto" },
        { id: "d", text: "Saturnus" },
      ],
      correct_answer: "b",
      explanation:
        "❄️ Neptunus adalah planet kedelapan dan terjauh dari Matahari setelah Pluto diklasifikasikan ulang sebagai planet katai.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
    {
      id: 10,
      uuid: "019a09bc-a6b6-71d7-abb6-567f4a0a42b0",
      topic_id: 4,
      question: "Apa yang dimaksud dengan planet gas raksasa?",
      options: [
        { id: "a", text: "Planet kecil tanpa atmosfer" },
        {
          id: "b",
          text: "Planet yang sebagian besar terdiri dari gas dan tidak memiliki permukaan padat",
        },
        { id: "c", text: "Planet dengan banyak cincin" },
        { id: "d", text: "Planet dengan gravitasi rendah" },
      ],
      correct_answer: "b",
      explanation:
        "🌫️ Planet gas raksasa seperti Jupiter dan Saturnus terdiri dari hidrogen dan helium, tanpa permukaan padat seperti Bumi.",
      topic: { id: 4, title: "Astronomi Dasar", slug: "astronomi-dasar" },
    },
  ];

  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState({});

  const handleAnswer = (id, answer) => {
    if (selected[id]) return;
    setSelected({ ...selected, [id]: answer });
    console.log(selected);
  };

  const nextQuestion = () => {
    if (current + 1 < quizzes.length) setCurrent(current + 1);
    else setShowResult(true);
  };
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center">
      {!showResult ? (
        <>
          <QuizHeader />
          <QuizQuestion
            quiz={quizzes[current]}
            selected={selected}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
          />
          <QuizFooter
            current={current}
            total={quizzes.length}
            selected={selected}
            nextQuestion={nextQuestion}
            currentQuizId={quizzes[current].id}
          />
        </>
      ) : (
        <QuizResult quizzes={quizzes} selected={selected} />
      )}
    </div>
  );
}
