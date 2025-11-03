import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

const SkeletonProfile = () => {
  return (
    <main className="p-10 w-full min-h-screen pb-30">
      {/* profile picture card */}
      <div className="flex md:flex-row flex-col border-2 border-b-4 rounded-xl p-5 gap-5 items-center">
        <Skeleton className="rounded-full h-[100px] w-[100px]" />
        <div className="flex flex-col md:items-start items-center h-full justify-between gap-y-3">
          {/* profile picture text */}
          <Skeleton className="w-[150px] h-4" />
          {/* upload button */}
          <Skeleton className="h-7 w-[130px]" />

          <div className="flex gap-1 flex-col">
            {/* file support */}
            <Skeleton className={"w-30 h-2"} />
            <Skeleton className={"w-30 h-2"} />
          </div>
        </div>
      </div>

      <hr className="my-5 border-2 rounded-full" />

      {/* informasi pribadi card */}
      <div className="border-2 border-b-4 rounded-xl p-5 pb-10 mb-5">
        <div className="flex justify-between mb-5 items-center">
          {/* informasi pribadi */}
          <Skeleton className="w-40 h-6" />

          {/* button edit */}
          <Skeleton className="w-10 h-10" />
        </div>
        <div className="flex gap-2 md:flex-row flex-col gap-y-3">
          <div className="w-full flex flex-col gap-2">
            <Skeleton className={"w-20 h-3"} />
            <Skeleton className={"w-30 h-3"} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className={"w-20 h-3"} />
            <Skeleton className={"w-30 h-3"} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className={"w-20 h-3"} />
            <Skeleton className={"w-30 h-3"} />
          </div>
        </div>
      </div>

      {/* bio card */}
      <div className="w-full rounded-xl p-5 border-2 border-b-4">
        <div className="flex justify-between mb-5 items-center">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className={"w-[80%] h-2"} />
          <Skeleton className={"w-[80%] h-2"} />
          <Skeleton className={"w-[50%] h-2"} />
        </div>
      </div>
    </main>
  );
};

export default SkeletonProfile;
