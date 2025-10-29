import Image from "next/image";
import React from "react";

const CourseCard = ({ icon, subject, description }) => {
  return (
    <div className="h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex lg:flex-col flex-row items-center justify-center py-3 lg:px-3 px-6 lg:gap-y-2 gap-x-6 pb-6 min-h-[217px]">
      <Image src={icon} alt={subject} width={55} height={55} />
      <div className="flex flex-col justify-start lg:items-center gap-y-2">
        <h5 className="font-extrabold text-black text-xl mt-3">{subject}</h5>
        <p className="lg:text-center text-neutral-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
