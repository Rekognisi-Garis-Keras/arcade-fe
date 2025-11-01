"use client";

export default function QuizResult({ quizzes, selected }) {
  const correctCount = quizzes.filter(
    (q) => selected[q.id] === q.correct_answer
  ).length;

  return (
    <div className="text-center flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-slate-800">🎉 Quiz Selesai!</h2>
      <p className="text-slate-600">
        Kamu menjawab benar <strong>{correctCount}</strong> dari{" "}
        {quizzes.length} soal.
      </p>

      <div className="mt-4 space-y-2 text-left">
        {quizzes.map((quiz, idx) => {
          const userAnswer = selected[quiz.id];
          const isCorrect = userAnswer === quiz.correct_answer;

          return (
            <div
              key={quiz.id}
              className={`p-3 rounded-xl border ${
                isCorrect
                  ? "border-green-400 bg-green-50"
                  : "border-red-400 bg-red-50"
              }`}
            >
              <p className="font-medium">
                {idx + 1}. {quiz.question}
              </p>
              <p className="text-sm">
                Jawaban kamu:{" "}
                <span
                  className={`font-semibold ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {quiz.options.find((o) => o.id === userAnswer)?.text || "-"}
                </span>
              </p>
              {!isCorrect && (
                <p className="text-sm text-green-600">
                  ✅ Jawaban benar:{" "}
                  {quiz.options.find((o) => o.id === quiz.correct_answer)?.text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
