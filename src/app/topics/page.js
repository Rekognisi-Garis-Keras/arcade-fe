import StickyWrapper from "@/components/DetailSubject/StickyWrapper";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";
import EachUtils from "@/utils/EachUtils";
import LessonButton from "./LessonButton";

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
        <div className="w-5 relative mx-auto">
          <EachUtils
            of={LIST_LESSON_ASTRONOMY}
            render={(item, index) => (
              <>
                <Link href={`/astronomi/${item.slug}`} key={index}>
                  <LessonButton
                    buttonType="lesson"
                    locked={item.locked}
                    index={index}
                    subIndex={0}
                  />
                </Link>
                <Link href={`/astronomi/${item.slug}`} key={index}>
                  <LessonButton
                    buttonType="ar"
                    locked={item.locked}
                    index={index}
                    subIndex={1}
                  />
                </Link>
                <Link href={`/astronomi/${item.slug}`} key={index}>
                  <LessonButton
                    buttonType="quiz"
                    locked={item.locked}
                    index={index}
                    subIndex={2}
                  />
                </Link>
              </>
            )}
          />
          {/* <Link href="/subjects/astronomi/matahari">
            <LessonButton index={0} buttonType="lesson" />
          </Link>
          <Link href="/subjects/astronomi/matahari/ar">
            <LessonButton index={1} buttonType="ar" />
          </Link>
          <Link href="/subjects/astronomi/matahari/quiz">
            <LessonButton index={2} buttonType="quiz" />
          </Link>
          <Link href="/subjects/astronomi/matahari/quiz">
            <LessonButton index={3} buttonType="lesson" />
          </Link>
          <Link href="/subjects/astronomi/matahari/quiz">
            <LessonButton index={4} buttonType="ar" />
          </Link>
          <Link href="/subjects/astronomi/matahari/quiz">
            <LessonButton index={5} buttonType="quiz" />
          </Link> */}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DetailSubject;
