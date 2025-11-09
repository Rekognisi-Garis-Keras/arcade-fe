import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CardBooks = ({ imgUrl, title, description, btnUrl }) => {
  return (
    <div className="w-full rounded-xl flex flex-col border">
      <img
        src={imgUrl}
        alt={`${title}'s cover`}
        className="rounded-t-xl object-cover aspect-video"
      />
      <div className="flex flex-col items-start p-5 gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-md font-semibold">{title}</h2>
          <p className="text-sm tracking-tight leading-4.5 line-clamp-2 text-gray-500">
            {description}
          </p>
        </div>
        <div className="flex items-center">
          <Link
            href={btnUrl}
            className="group cursor-pointer flex items-center hover:underline text-sm"
          >
            Akses Buku
            <ChevronRight
              strokeWidth={1}
              size={20}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBooks;
