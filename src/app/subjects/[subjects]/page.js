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
import { MoveLeft } from "lucide-react";
import DetailSubjectsSkeleton from "@/components/DetailSubject/Skeleton";
import AuthGuard from "@/utils/authGuard";

export default function DetailSubject() {
  const router = useRouter();
  const { subjects: subjectSlug } = useParams();
  const [topics, setTopics] = useState([]);
  const [subjectDetail, setSubjectDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // fetch subject detail
        const subjectRes = await apiRequest(`/subjects/${subjectSlug}`, {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (subjectRes.status !== "success" || !subjectRes.data) {
          router.push("/not-found");
          return;
        }

        setSubjectDetail(subjectRes.data);

        // fetch topics
        const topicRes = await apiRequest(`/subjects/${subjectSlug}/topics`, {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (topicRes.status === "success" && topicRes.data.length > 0) {
          // sort by id ascending
          const sortedTopics = topicRes.data.sort((a, b) => a.id - b.id);
          setTopics(sortedTopics);
        } else {
          router.push("/not-found");
        }
      } catch (err) {
        console.error("Failed to fetch subject/topics:", err);
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectSlug, router]);

  if (loading) return <DetailSubjectsSkeleton />;
  if (!subjectDetail) return null;

  return (
    <AuthGuard>
      <div className="flex flex-row-reverse gap-12 px-6 pb-30 md:pb-0">
        <StickyWrapper>
          <div className="min-h-[200px] w-full border-2 rounded-xl flex flex-col gap-2 p-5 shadow-xs mt-5">
            <h1 className="text-lg text-shadow-gray-800">Tahukah kamu?</h1>
            <div className="flex items-center gap-4">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/7082c58e0bdbfbf9aec94191b704f549.svg"
                width="50px"
              />
              <p className="text-slate-700 text-sm">
                🌌 Tahukah kamu, bintang yang paling terang dan paling sering
                kita lihat di langit malam, Sirius, sebenarnya berjarak sekitar
                8,6 tahun cahaya dari Bumi? Itu artinya, cahaya yang kamu lihat
                malam ini sudah melakukan perjalanan selama 8,6 tahun untuk
                sampai di matamu! 🤯✨
              </p>
            </div>
          </div>
        </StickyWrapper>
        <ContentWrapper>
          <div className="w-full rounded-xl border-2 border-b-4 bg-white mb-10 p-5 flex flex-col gap-y-1 ">
            <div className="flex items-center gap-3">
              <Link href="/subjects">
                <MoveLeft />
              </Link>
              <h3 className="font-bold text-xl">{subjectDetail.name}</h3>
            </div>
            <p className="text-sm font-medium">{subjectDetail.desc}</p>
          </div>

          <EachUtils
            of={topics}
            render={(topic, index) => (
              <div className="h-[350px] w-full mb-3" key={topic.id}>
                <TopicTitle text={topic.title} />

                <div className="w-2 h-1 relative mx-auto flex gap-x-3">
                  <Link
                    href={`/subjects/${subjectSlug}/${topic.slug}`}
                    key={index + 1}
                  >
                    <LessonButton
                      buttonType="lesson"
                      locked={false}
                      index={index}
                      subIndex={0}
                    />
                  </Link>
                  <Link
                    href={`/subjects/${subjectSlug}/${topic.slug}/ar`}
                    key={index + 2}
                  >
                    <LessonButton
                      buttonType="ar"
                      locked={false}
                      index={index}
                      subIndex={1}
                    />
                  </Link>
                  <Link
                    href={`/subjects/${subjectSlug}/${topic.slug}/quiz`}
                    key={index + 3}
                  >
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
    </AuthGuard>
  );
}
