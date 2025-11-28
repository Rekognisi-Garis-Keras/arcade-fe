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
  const isLastQuestion = index + 1 >= total;

  // Handle skip button
  const handleSkip = () => {
    if (!isAnswered) {
      // If it's the last question, submit instead of going to next
      if (isLastQuestion) {
        onSubmit();
      } else {
        nextQuestion();
      }
    }
  };

  // Handle primary button (Selanjutnya/Lihat Hasil)
  const handlePrimaryClick = () => {
    if (!isAnswered) return;
    if (isLastQuestion) {
      onSubmit();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="h-30 bg-white border-t-2 w-full flex justify-center">
      <div className="w-5xl h-full flex items-center justify-between px-5 gap-3">
        <Button
          variant={"skip"}
          className={"md:w-40 w-35 cursor-pointer"}
          onClick={handleSkip}
          disabled={isAnswered} // Disable skip if already answered
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
          {isLastQuestion ? "Lihat Hasil" : "Selanjutnya"}
        </Button>
      </div>
    </div>
  );
};

export default QuizFooter;
