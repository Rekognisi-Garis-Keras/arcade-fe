import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

const SkeletonMarquee = () => {
  return (
    <div className="h-20 border-2 border-steal-200 flex items-center">
      <div className="max-w-[1036px] mx-auto [--gap:4rem]">
        <div className="flex items-center gap-x-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-row gap-3 items-center">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonMarquee;
