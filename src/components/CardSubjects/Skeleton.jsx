import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

const SkeletonSubjects = () => {
  return (
    <div className="pt-6 grid grid-cols-1 pb-20 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          className="h-full border-2 rounded-xl border-b-4 flex lg:flex-col flex-row items-center justify-center py-3 lg:px-3 px-6 lg:gap-y-5 gap-x-6 pb-6 min-h-[217px]"
          key={i}
        >
          <Skeleton className="h-[65px] w-[65px]" />
          <div className="flex flex-col justify-start lg:items-center gap-y-3 w-full">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonSubjects;
