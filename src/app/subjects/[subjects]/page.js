import StickyWrapper from "@/components/DetailSubject/StickyWrapper";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";

const DetailSubject = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>mystickysidebar</StickyWrapper>
      <ContentWrapper>My Content</ContentWrapper>
    </div>
  );
};

export default DetailSubject;
