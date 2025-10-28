"use client";

import EachUtils from "@/utils/EachUtils";
import { LIST_COURSES } from "@/constants/listCourses";
import CourseCard from "@/components/CourseCard";

const List = () => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      <EachUtils
        of={LIST_COURSES}
        render={(item, index) => (
          <CourseCard
            key={item.id}
            icon={item.iconSrc}
            subject={item.subject}
            description={item.desc}
          />
        )}
      />
    </div>
  );
};

export default List;
