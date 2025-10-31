"use client";

import EachUtils from "@/utils/EachUtils";
import { LIST_COURSES } from "@/constants/listCourses";
import CourseCard from "@/components/CardSubjects/SubjectCard";
import Link from "next/link";

const List = () => {
  return (
    <div className="pt-6 grid grid-cols-1 pb-20 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4">
      <EachUtils
        of={LIST_COURSES}
        render={(item) => (
          <Link href={item.path}>
            <CourseCard
              key={item.id}
              icon={item.iconSrc}
              subject={item.subject}
              description={item.desc}
            />
          </Link>
        )}
      />
    </div>
  );
};

export default List;
