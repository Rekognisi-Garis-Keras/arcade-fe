"use client";

import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import QuizOption from "./QuizOption";
import QuizExplanation from "./QuizExplanation";

export default function QuizQuestion({
  quiz,
  index,
  total,
  selected,
  handleAnswer,
  nextQuestion,
}) {
  const selectedOption = selected[quiz.id];
  const isAnswered = !!selectedOption;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {quiz.topic.title} — {index + 1}/{total}
        </CardTitle>
        <p className="text-slate-500">{quiz.question}</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {quiz.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            correctAnswer={quiz.correct_answer}
            selectedOption={selectedOption}
            onSelect={() => handleAnswer(quiz.id, option.id)}
          />
        ))}

        <AnimatePresence>
          {isAnswered && (
            <QuizExplanation
              text={quiz.explanation || "Penjelasan belum tersedia."}
            />
          )}
        </AnimatePresence>

        {isAnswered && (
          <Button className="mt-4" onClick={nextQuestion}>
            {index + 1 < total ? "Next ➡️" : "Lihat Hasil 🎯"}
          </Button>
        )}
      </CardContent>
    </>
  );
}
