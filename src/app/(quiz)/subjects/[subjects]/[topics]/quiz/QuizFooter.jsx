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
      <div className="w-5xl h-full flex items-center justify-between px-5 gap-3">
        <Button
          variant={"skip"}
          className={"md:w-40 w-35 cursor-pointer"}
          onClick={handleSkip}
        >
          Lewati
        </Button>
        <span className="md:text-lg text-md font-bold text-center">{`Soal ${
          current + 1
        }/${total}`}</span>
        <Button
          variant={"primary"}
          className={"md:w-40 w-35 cursor-pointer"}
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
