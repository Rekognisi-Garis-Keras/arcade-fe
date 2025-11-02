import React from "react";
import Image from "next/image";

const HeaderForm = ({ header, paragraph }) => {
  return (
    <div className="mb-6 text-center flex flex-col items-center">
      <Image
        alt="logo"
        src={"/logo.png"}
        width={60}
        height={60}
        className="mb-3"
      />

      <h2 className="font-extrabold mb-1 text-2xl text-slate-700">{header}</h2>
      <p className="text-slate-500">{paragraph}</p>
    </div>
  );
};

export default HeaderForm;
