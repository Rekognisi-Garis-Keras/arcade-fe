"use client";

import React, { useEffect, useState } from "react";
import { Marquee } from "../UI/marquee";
import EachUtils from "@/utils/EachUtils";
import Image from "next/image";
import { apiRequest } from "@/utils/api";
import SkeletonMarquee from "./SkeletonMarquee";

const CourseMarquee = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiRequest("/subjects", {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.status === "success" && res.data.length > 0) {
          setSubjects(res.data);
        } else {
          setSubjects([]);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <SkeletonMarquee />;
  if (subjects.length === 0) return <p>No courses available</p>;

  return (
    <div className="h-20 border-2 border-steal-200 flex items-center">
      <Marquee className="max-w-[1036px] mx-auto [--gap:4rem] [--duration:10s]">
        <div className="flex items-center gap-x-12">
          <EachUtils
            of={subjects}
            render={(item) => (
              <div key={item.id} className="flex flex-row items-center">
                <Image
                  alt={item.name}
                  width={40}
                  height={40}
                  src={item.thumbnail} // pakai thumbnail dari API
                  className="mr-4"
                />
                <span className="text-lg font-bold">{item.name}</span>
              </div>
            )}
          />
        </div>
      </Marquee>
    </div>
  );
};

export default CourseMarquee;
