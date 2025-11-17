import React from "react";
import { Button } from "@/components/UI/button";

const QuizOption = ({ option, correctAnswer, selectedOption, onSelect }) => {
  const isCorrect = selectedOption && option.id === correctAnswer;

  const isWrong =
    selectedOption &&
    option.id === selectedOption &&
    option.id !== correctAnswer;

  return (
    <Button
      variant={isCorrect ? "optionTrue" : isWrong ? "optionFalse" : "option"}
      className="cursor-pointer"
      onClick={onSelect}
      size={"optionButton"}
    >
      {option.text}
    </Button>
  );
};

export default QuizOption;
