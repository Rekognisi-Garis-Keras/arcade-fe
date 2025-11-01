import React from "react";
import { MessageCircleQuestionMark, Star, Smartphone } from "lucide-react";
import { Button } from "@/components/UI/button";

const LessonButton = ({ index, locked, buttonType = "lesson", subIndex }) => {
  const offset = 60;

  let horizontalShift;

  if (buttonType === "lesson" || buttonType === "quiz") {
    horizontalShift = 0;
  } else {
    index % 2 == 0 ? (horizontalShift = offset) : (horizontalShift = -offset);
  }

  const icons = {
    lesson: Star,
    ar: Smartphone,
    quiz: MessageCircleQuestionMark,
  };

  const Icon = icons[buttonType];

  const verticalPosition = (index * 3 + subIndex) * 110;

  return (
    <Button
      size="rounded"
      variant={locked ? "lessonLocked" : "lessonOpen"}
      style={{
        marginTop: `${verticalPosition}px`,
        left: `${horizontalShift}px`,
      }}
    >
      <Icon
        className={`w-10! h-10! ${
          locked ? "text-[#b7b7b7] fill-[#b7b7b7]" : "text-white fill-white"
        }`}
      />
    </Button>
  );
};

export default LessonButton;
