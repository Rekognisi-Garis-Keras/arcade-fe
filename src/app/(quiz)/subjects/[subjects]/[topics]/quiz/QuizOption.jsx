"use client";

import { motion } from "framer-motion";

export default function QuizOption({
  option,
  correctAnswer,
  selectedOption,
  onSelect,
}) {
  const isCorrect = selectedOption && option.id === correctAnswer;
  const isWrong =
    selectedOption &&
    option.id === selectedOption &&
    option.id !== correctAnswer;

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      disabled={!!selectedOption}
      className={`w-full text-left p-3 rounded-xl border transition-all duration-200
        ${
          isCorrect
            ? "border-green-500 bg-green-50"
            : isWrong
            ? "border-red-500 bg-red-50"
            : "border-slate-300 hover:border-slate-400"
        }`}
    >
      {option.text}
    </motion.button>
  );
}
