import StickyWrapper from "@/components/DetailSubject/StickyWrapper";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";
import EachUtils from "@/utils/EachUtils";
import LessonButton from "./LessonButton";

import TopicTitle from "./TopicTitle";
import React from "react";

import { LIST_LESSON_ASTRONOMY } from "@/constants/listLesson";
import Link from "next/link";

const DetailSubject = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper></StickyWrapper>
      <ContentWrapper>
        <div className="w-full rounded-xl border-2 border-b-4 h-[100px] bg-white mb-10 p-5 flex flex-col gap-y- ">
          <h3 className="font-extrabold text-xl">SECTION 1 UNIT 5</h3>
          <p className="text-md font-bold">lorem ipsum sit</p>
        </div>
        <EachUtils
          of={LIST_LESSON_ASTRONOMY}
          render={(item, index) => (
            <div className="h-[350px] w-full mb-3" key={index}>
              <TopicTitle text={item.title} />
              <div className="w-2 h-1 relative mx-auto">
                <LessonButton
                  buttonType="lesson"
                  locked={item.locked}
                  index={index}
                  subIndex={0}
                />
                <Link href={`/astronomi/${item.slug}`} key={index + 2}>
                  <LessonButton
                    buttonType="ar"
                    locked={item.locked}
                    index={index}
                    subIndex={1}
                  />
                </Link>
                <Link href={`/astronomi/${item.slug}`} key={index + 3}>
                  <LessonButton
                    buttonType="quiz"
                    locked={item.locked}
                    index={index}
                    subIndex={2}
                  />
                </Link>
              </div>
            </div>
          )}
        />
      </ContentWrapper>
    </div>
  );
};

export default DetailSubject;
