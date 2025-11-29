import React from "react";
import { Skeleton } from "@/components/UI/skeleton";
import TopicWrapper from "@/components/DetailTopic/TopicWrapper";
import AsideWrapper from "@/components/DetailTopic/AsideWrapper";

const DetailTopicSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 lg:gap-12 px-6">
      {/* Navbar Skeleton */}
      <div className="bg-white relative h-[70px] rounded-xl border-2 border-b-4 border-r-4 border-steal-200 flex items-center justify-center">
        <Skeleton className="absolute top-1/2 left-10 -translate-y-1/2 h-6 w-6" />
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="flex gap-6 material">
        {/* Content Skeleton */}
        <TopicWrapper>
          <div className="space-y-6">
            {/* Title Skeleton */}
            <Skeleton className="h-9 w-3/4" />

            {/* Paragraph Skeletons */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Subtitle Skeleton */}
            <Skeleton className="h-7 w-2/3 mt-8" />

            {/* Paragraph Skeletons */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* List Skeletons */}
            <div className="space-y-2 mt-6">
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>

            {/* Another Section */}
            <Skeleton className="h-7 w-1/2 mt-8" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Image Skeleton */}
            <Skeleton className="h-60 w-full rounded-lg mt-6" />

            {/* More Content */}
            <div className="space-y-3 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </TopicWrapper>

        {/* Aside Skeleton */}
        <AsideWrapper>
          <div className="sticky top-24">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12 ml-4" />
              <Skeleton className="h-4 w-10/12 ml-8" />
              <Skeleton className="h-4 w-11/12 ml-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12 ml-4" />
              <Skeleton className="h-4 w-9/12 ml-4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </AsideWrapper>
      </div>
    </div>
  );
};

export default DetailTopicSkeleton;
