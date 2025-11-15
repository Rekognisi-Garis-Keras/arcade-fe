import React from "react";
import { Button } from "@/components/UI/button";

const QuizFooter = ({
  current,
  total,
  nextQuestion,
  currentQuizId,
  selected,
  onSubmit,
  index,
}) => {
  const isAnswered = selected[currentQuizId];

  // 🆕 handle tombol skip
  const handleSkip = () => {
    if (!isAnswered) {
      nextQuestion(); // langsung ke soal berikutnya
    }
  };

  // handle tombol utama (Selanjutnya/Lihat Hasil)
  const handlePrimaryClick = () => {
    if (!isAnswered) return;
    if (index + 1 < total) {
      nextQuestion();
    } else {
      onSubmit();
    }
  };

  return (
    <div className="h-30 bg-white border-t-2 w-full flex justify-center">
      <div className="w-5xl h-full flex items-center justify-between px-5">
        <Button
          variant={"skip"}
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
          onClick={handlePrimaryClick}
          disabled={!isAnswered}
        >
          {index + 1 < total ? "Selanjutnya" : "Lihat Hasil"}
        </Button>
      </div>
    </div>
  );
};

export default QuizFooter;
