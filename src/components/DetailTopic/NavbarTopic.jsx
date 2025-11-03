import React from "react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const NavbarTopic = ({ title = "", slug = "" }) => {
  return (
    <div className="bg-white relative h-[70px] rounded-xl border-2 border-b-4 border-r-4 border-steal-200 flex items-center justify-center">
      <Link
        href={`/subjects/${slug}`}
        className="absolute top-1/2 left-10 -translate-y-1/2"
      >
        <MoveLeft />
      </Link>
      <div>
        <h5 className="font-bold text-lg">
          <span className="hidden md:inline">{title}</span>
        </h5>
      </div>
    </div>
  );
};

export default NavbarTopic;
