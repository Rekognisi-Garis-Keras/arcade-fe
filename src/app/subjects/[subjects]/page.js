"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StickyWrapper from "@/components/DetailSubject/StickyWrapper";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";
import EachUtils from "@/utils/EachUtils";
import LessonButton from "@/components/LessonButton";
import TopicTitle from "@/components/TopicTitle";
import { apiRequest } from "@/utils/api";
import Link from "next/link";

const DetailSubject = () => {
  const router = useRouter();
  const { subjects: subjectSlug } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiRequest(`/subjects/${subjectSlug}/topics`, {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.status === "success" && res.data.length > 0) {
          setTopics(res.data);
        } else {
          router.replace("/not-found");
        }
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subjectSlug, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper />
      <ContentWrapper>
        <div className="w-full rounded-xl border-2 border-b-4 h-[100px] bg-white mb-10 p-5 flex flex-col gap-y- ">
          <h3 className="font-extrabold text-xl">SECTION 1 UNIT 5</h3>
          <p className="text-md font-bold">lorem ipsum sit</p>
        </div>

        <EachUtils
          of={topics}
          render={(topic, index) => (
            <div className="h-[350px] w-full mb-3" key={topic.id}>
              <TopicTitle text={topic.title} />

              <div className="w-2 h-1 relative mx-auto flex gap-x-3">
                <Link href={`/subjects/${subjectSlug}/${topic.slug}`} key={index + 1}>
                  <LessonButton
                    buttonType="lesson"
                    locked={false}
                    index={index}
                    subIndex={0}
                  />
                </Link>
                <Link href={`/subjects/${subjectSlug}/${topic.slug}/ar`} key={index + 2}>
                  <LessonButton
                    buttonType="ar"
                    locked={false}
                    index={index}
                    subIndex={1}
                    
                  />
                </Link>
                <Link href={`/subjects/${subjectSlug}/${topic.slug}/quiz`} key={index + 3}>
                  <LessonButton
                    buttonType="quiz"
                    locked={false}
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
