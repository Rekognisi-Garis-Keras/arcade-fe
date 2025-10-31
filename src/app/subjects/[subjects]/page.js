import StickyWrapper from "@/components/DetailSubject/StickyWrapper";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";
import EachUtils from "@/utils/EachUtils";
import LessonButton from "@/components/LessonButton";

const lessons = [
  { id: 1, title: "Intro to Cells" },
  { id: 2, title: "DNA Basics" },
  { id: 3, title: "Chromosomes" },
  { id: 4, title: "Genetic Code" },
  { id: 5, title: "Mitosis" },
  { id: 6, title: "Meiosis" },
];

const DetailSubject = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper></StickyWrapper>
      <ContentWrapper>
        <div className="w-full rounded-xl border-2 border-b-4 h-[100px] bg-white mb-10 p-5 flex flex-col gap-y- ">
          <p className="font-extrabold text-sm  ">SECTION 1 UNIT 5</p>
          <p className="text-xl font-bold">
            lorem ipsum sit dolor amet met mot met mot met mot
          </p>
        </div>
        <div className="w-5 relative mx-auto">
          <EachUtils
            of={lessons}
            render={(item, index) => <LessonButton index={index} key={index} />}
          />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DetailSubject;
