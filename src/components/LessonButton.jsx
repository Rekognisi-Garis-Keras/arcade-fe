import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/UI/button";

const LessonButton = ({ index, locked }) => {
  const cycleLength = 6;
  const cycleIndex = index % cycleLength;

  const offset = 60;

  let horizontalShift;

  if (cycleIndex === 1) horizontalShift = offset;
  else if (cycleIndex === 4) horizontalShift = -offset;
  else horizontalShift = 0;

  return (
    <Button
      size="rounded"
      variant={locked ? "lessonLocked" : "lessonOpen"}
      style={{
        marginTop: `${index * 110}px`,
        left: `${horizontalShift}px`,
      }}
    >
      <Star
        className={`w-10! h-10! ${
          locked ? "text-[#b7b7b7] fill-[#b7b7b7]" : "text-white fill-white"
        }`}
      />
    </Button>
  );
};

export default LessonButton;
