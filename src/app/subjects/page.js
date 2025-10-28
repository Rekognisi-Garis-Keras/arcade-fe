import React from "react";
import { LIST_COURSES } from "@/constants/listCourses";
import EachUtils from "@/utils/EachUtils";
import List from "@/components/List";

const LearnPage = () => {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Mata Pelajaran</h1>
      <List />
    </div>
  );
};

export default LearnPage;
