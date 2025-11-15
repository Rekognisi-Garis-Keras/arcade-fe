"use client";
import { Button } from "@/components/UI/button";
import { CountingNumber } from "@/components/UI/shadcn-io/counting-number";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useEffect } from "react";

export default function QuizResult({ quizzes, selected }) {
  const correctCount = quizzes.filter(
    (q) => selected[q.id] === q.correct_answer
  ).length;
  
  const skippedCount = quizzes.filter(
    (q) => selected[q.id] === undefined
  ).length;
  
  const wrongCount = quizzes.length - correctCount - skippedCount;
  
  const xp = correctCount * 10;

  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen w-full py-10 px-4 md:px-10">
      {/* 🎉 Header Result */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-4xl">🎉</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Quiz Selesai!</h2>
        <p className="text-lg text-gray-700 mt-2">
          Kamu benar <strong>{correctCount}</strong> dari {quizzes.length} soal.
        </p>
        <p className="text-lg text-gray-800 mt-2">
          Kamu mendapatkan{" "}
          <CountingNumber
            number={xp}
            transition={{ stiffness: 40, damping: 30 }}
          />{" "}
          XP!
        </p>
      </div>

      {/* 📊 Summary Boxes */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-10">
        <div className="flex flex-col items-center justify-center w-full max-w-[220px] h-[120px] rounded-xl border-2 border-b-4 border-r-4 border-green-600 bg-green-400 text-white">
          <h3 className="text-lg font-bold">Jawaban Benar</h3>
          <p className="text-3xl font-bold">{correctCount}</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-[220px] h-[120px] rounded-xl border-2 border-b-4 border-r-4 border-red-600 bg-red-500 text-white">
          <h3 className="text-lg font-bold">Jawaban Salah</h3>
          <p className="text-3xl font-bold">{wrongCount}</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-[220px] h-[120px] rounded-xl border-2 border-b-4 border-r-4 border-gray-600 bg-gray-400 text-white">
          <h3 className="text-lg font-bold">Dilewati</h3>
          <p className="text-3xl font-bold">{skippedCount}</p>
        </div>
      </div>

      {/* 🧾 Detail Results */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-5 border-2 border-r-4 border-b-4">
        <h1 className="text-2xl font-bold mb-5 text-gray-800">
          Ringkasan Hasil
        </h1>
        <div className="space-y-3 mb-3">
        {quizzes.map((quiz, idx) => {
          const userAnswer = selected[quiz.id];
          const correctAnswer = quiz.correct_answer;

          const userOption = quiz.options.find((o) => o.id === userAnswer);
          const correctOption = quiz.options.find((o) => o.id === correctAnswer);

          const isCorrect = userAnswer === correctAnswer;
          const isSkipped = userAnswer === undefined;
          const isWrong = !isCorrect && !isSkipped;

          return (
            <div
              key={quiz.id}
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? "border-green-400 bg-green-50"
                  : isWrong
                  ? "border-red-400 bg-red-50"
                  : "border-gray-400 bg-gray-100"
              }`}
            >
              <p className="font-semibold text-gray-800">
                {idx + 1}. {quiz.question}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Jawaban kamu:{" "}
                <span
                  className={`font-semibold ${
                    isCorrect
                      ? "text-green-600"
                      : isWrong
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {userOption?.text || "-"}
                </span>
              </p>

              {!isCorrect && correctOption && (
                <p className="text-sm text-green-600">
                  {" "}
                  ✅ Jawaban yang benar: {correctOption.text}
                </p>
              )}
            </div>
          );
        })}

        </div>
        <Link href="/subjects/astronomi">
          <Button
            variant={"primary"}
            size={"lg"}
            className={"w-full cursor-pointer"}
          >
            Kembali ke pelajaran
          </Button>
        </Link>
      </div>
    </div>
  );
}
