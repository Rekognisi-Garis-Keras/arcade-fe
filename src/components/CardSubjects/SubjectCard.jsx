import Image from "next/image";
import React from "react";

const CourseCard = ({ icon, subject, description }) => {
  return (
    <div className="h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 gap-y-2 pb-6 min-h-[217px] min-w-[200px]">
      <Image src={icon} alt={subject} width={55} height={55} />
      <h5 className="font-bold text-black text-lg mt-3">{subject}</h5>
      <p className="text-center text-neutral-700 text-xs">{description}</p>
    </div>
  );
};

export default CourseCard;
