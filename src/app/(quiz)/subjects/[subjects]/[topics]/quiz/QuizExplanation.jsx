"use client";

import { motion } from "framer-motion";

export default function QuizExplanation({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-3 p-3 bg-lime-100 border border-lime-400 rounded-lg text-sm text-gray-800"
    >
      💬 <strong>Penjelasan:</strong> {text}
    </motion.div>
  );
}
