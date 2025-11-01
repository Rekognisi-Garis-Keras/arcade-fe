"use client";

import { motion } from "framer-motion";

export default function QuizExplanation({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600"
    >
      💬 <strong>Penjelasan:</strong> {text}
    </motion.div>
  );
}
