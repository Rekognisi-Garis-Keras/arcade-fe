// Save this file as: src/components/AR/ARPageSkeleton.jsx

import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

const ARPageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen pb-25 px-5">
      {/* Navbar Skeleton */}
      <div className="bg-white relative h-[70px] rounded-xl border-2 border-b-4 border-r-4 border-steal-200 flex items-center justify-center mb-5">
        <Skeleton className="absolute top-1/2 left-10 -translate-y-1/2 h-6 w-6" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* AR Camera Skeleton */}
      <div className="relative my-5">
        <Skeleton className="w-full h-[600px] rounded-xl" />
      </div>

      {/* Content Section Skeleton */}
      <div className="flex lg:flex-row flex-col-reverse items-center gap-y-3 gap-x-5">
        {/* Description/QA Box Skeleton */}
        <div className="grow border-2 p-5 rounded-xl border-steel-200 border-b-4 w-full">
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Mic Button Skeleton */}
        <div className="flex h-[100px] w-[100px] items-center justify-center">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ARPageSkeleton;
