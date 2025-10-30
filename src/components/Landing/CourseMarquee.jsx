import React from "react";
import { Marquee } from "../UI/marquee";
import EachUtils from "@/utils/EachUtils";
import { LIST_COURSES } from "@/constants/listCourses";
import Image from "next/image";

const CourseMarquee = () => {
  return (
    <div className="h-20 border-2 border-steal-200 flex items-center">
      <Marquee className="max-w-[1036px] mx-auto [--gap:4rem] [--duration:10s]">
        <div className="flex items-center gap-x-12">
          <EachUtils
            of={LIST_COURSES}
            render={(item) => (
              <div key={item.id} className="flex flex-row items-center">
                <Image
                  key={item.id}
                  alt={item.subject}
                  width={40}
                  height={40}
                  src={item.iconSrc}
                  className="mr-4"
                />
                <span className="text-lg font-bold">{item.subject}</span>
              </div>
            )}
          />
        </div>
      </Marquee>
    </div>
  );
};

export default CourseMarquee;
