import React from "react";
import { Button } from "@/components/UI/button";

const QuizFooter = ({
  current,
  total,
  nextQuestion,
  currentQuizId,
  selected,
  index,
}) => {
  const isAnswered = selected[currentQuizId];

  // 🆕 handle tombol skip
  const handleSkip = () => {
    if (!isAnswered) {
      nextQuestion(); // langsung ke soal berikutnya
    }
  };
  return (
    <div className="h-30 bg-white border-t-2 w-full flex justify-center">
      <div className="w-5xl h-full flex items-center justify-between px-5">
        <Button
          variant={"danger"}
          className={"w-40 cursor-pointer"}
          onClick={handleSkip}
        >
          Lewati
        </Button>
        <span className="text-lg font-bold">{`Soal ${
          current + 1
        }/${total}`}</span>
        <Button
          variant={"primary"}
          className={"w-40 cursor-pointer"}
          onClick={isAnswered ? nextQuestion : undefined}
          disabled={!isAnswered}
        >
          {index + 1 < total ? "Selanjutnya" : "Lihat Hasil"}
        </Button>
      </div>
    </div>
  );
};

export default QuizFooter;
