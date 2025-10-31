import React from "react";
import { Star } from "lucide-react";

const LessonButton = ({ index }) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let horizontalShift;
  if (cycleIndex <= 2) {
    horizontalShift = cycleIndex * 35;
  } else if (cycleIndex <= 4) {
    horizontalShift = (4 - cycleIndex) * 35;
  } else if (cycleIndex <= 6) {
    horizontalShift = (4 - cycleIndex) * 35;
  } else {
    horizontalShift = (cycleIndex - 8) * 35;
  }

  return (
    <button
      className="absolute w-20 h-20 rounded-full bg-[#58CC02] shadow-[0_6px_0_#45A801] active:shadow-[0_2px_0_#45A801] active:translate-y-1 transition-all duration-100 flex items-center justify-center"
      style={{
        marginTop: `${index * 110}px`,
        left: `${horizontalShift}px`,
      }}
    >
      <Star className="w-9 h-9 text-white fill-white" />
    </button>
  );
};

export default LessonButton;
