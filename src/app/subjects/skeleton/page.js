import React from "react";
import StickyWrapper from "@/components/DetailSubject/StickyWrapper";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";
import LessonButton from "@/components/LessonButton";
import { Skeleton } from "@/components/UI/skeleton";

const DetailSubjectsSkeleton = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper />
      <ContentWrapper>
        <div className="w-full rounded-xl border-2 border-b-4 bg-white mb-10 p-5 flex flex-col gap-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-9" />
            <Skeleton className="w-[200px] h-7" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-[80%] h-2" />
          </div>
        </div>

        {Array.from({ length: 2 }).map((_, index) => (
          <div className="h-[350px] w-full mb-3" key={index}>
            <Skeleton className="w-full h-3" />

            <div className="w-2 h-1 relative mx-auto flex gap-x-3">
              <LessonButton
                buttonType="lesson"
                locked={true}
                index={index}
                subIndex={0}
              />
              <LessonButton
                buttonType="ar"
                locked={true}
                index={index}
                subIndex={1}
              />
              <LessonButton
                buttonType="quiz"
                locked={true}
                index={index}
                subIndex={2}
              />
            </div>
          </div>
        ))}
      </ContentWrapper>
    </div>
  );
};

export default DetailSubjectsSkeleton;
