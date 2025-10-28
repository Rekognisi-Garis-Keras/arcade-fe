import StickyWrapper from "@/components/StickyWrapper";
import ContentWrapper from "@/components/ContentWrapper";

const DetailSubject = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>mystickysidebar</StickyWrapper>
      <ContentWrapper>My Content</ContentWrapper>
    </div>
  );
};

export default DetailSubject;
