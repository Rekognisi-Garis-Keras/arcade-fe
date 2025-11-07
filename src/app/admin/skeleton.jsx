import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

const SkeletonAdmin = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6 gap-y-5">
        <Skeleton className="w-40 h-10" />
        <div className="flex flex-col lg:flex-row gap-y-2 lg:justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="lg:w-70 flex-1 h-10" />
            <Skeleton className="w-10 h-10" />
          </div>
          <Skeleton className="lg:w-40 w-full h-10" />
        </div>
      </div>

      <Skeleton className="h-8 w-30 mb-5" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
};

export default SkeletonAdmin;
