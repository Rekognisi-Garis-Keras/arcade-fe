"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TopicWrapper from "@/components/DetailTopic/TopicWrapper";
import AsideWrapper from "@/components/DetailTopic/AsideWrapper";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import AuthGuard from "@/utils/authGuard";
import { apiRequest } from "@/utils/api";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { ArrowLeft, Smartphone, MessageCircleQuestionMark } from "lucide-react";
import DetailTopicSkeleton from "./DetailTopicsSkeleton";

function DetailTopicContent() {
  const router = useRouter();
  const { subjects: subjectSlug, topics: topicSlug } = useParams();
  const [topic, setTopic] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiRequest(
          `/subjects/${subjectSlug}/topics/${topicSlug}`,
          {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.status !== "success" || !res.data) {
          router.push("/not-found");
          return;
        }

        const { content } = res.data;
        const div = document.createElement("div");
        div.innerHTML = content;

        // ambil semua heading
        const headingElements = Array.from(div.querySelectorAll("h1, h2, h3"));
        const extractedHeadings = headingElements.map((el, index) => {
          const text = el.textContent?.trim() || `Heading ${index + 1}`;
          const id =
            el.id ||
            text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-") ||
            `heading-${index}`;
          el.id = id;
          return {
            id,
            text,
            level: parseInt(el.tagName.replace("H", ""), 10),
          };
        });

        setHeadings(extractedHeadings);
        setHtmlContent(div.innerHTML);
        setTopic(res.data);
      } catch (err) {
        console.error("Failed to fetch topic:", err);
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [subjectSlug, topicSlug, router]);

  const getIndentClass = (level) => {
    switch (level) {
      case 1:
        return "ml-0";
      case 2:
        return "ml-4";
      case 3:
        return "ml-8";
      default:
        return "ml-0";
    }
  };

  const getNumberedHeadings = () => {
    const counters = { h1: 0, h2: 0, h3: 0 };

    return headings.map((heading) => {
      let number = "";

      if (heading.level === 1) {
        counters.h1++;
        counters.h2 = 0;
        counters.h3 = 0;
        number = `${counters.h1}.`;
      } else if (heading.level === 2) {
        counters.h2++;
        counters.h3 = 0;
        number = `${counters.h1}.${counters.h2}.`;
      } else if (heading.level === 3) {
        counters.h3++;
        number = `${counters.h1}.${counters.h2}.${counters.h3}.`;
      }

      return {
        ...heading,
        number,
      };
    });
  };

  const numberedHeadings = getNumberedHeadings();

  if (loading) return <DetailTopicSkeleton />;
  if (!topic) return null;

  return (
    <AuthGuard>
      <div className="flex flex-col gap-3 lg:gap-12 px-6">
        <NavbarTopic title={topic.title} slug={subjectSlug} />

        {/* Navigation Buttons */}

        <div className="flex gap-6 material">
          <TopicWrapper className="material">
            <div
              id="topic-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose max-w-full"
            />
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-15">
              <Link href={`/subjects/${subjectSlug}`} className="flex-1">
                <Button
                  variant="secondary"
                  className="w-full gap-2 cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  Kembali ke Topik
                </Button>
              </Link>
              <Link
                href={`/subjects/${subjectSlug}/${topicSlug}/ar`}
                className="flex-1"
              >
                <Button
                  variant="primary"
                  className="w-full gap-2 cursor-pointer"
                >
                  <Smartphone size={18} />
                  AR {topic.title}
                </Button>
              </Link>
            </div>
          </TopicWrapper>

          <AsideWrapper>
            <div className="sticky top-24">
              <h3 className="font-semibold mb-2 mt-0">Daftar Isi</h3>
              <ul className="text-sm mb-0 list-none">
                {numberedHeadings.map((h) => (
                  <li
                    key={h.id}
                    className={`${getIndentClass(
                      h.level
                    )} cursor-pointer p-2 hover:bg-gray-100/80 rounded-sm group`}
                  >
                    <a
                      href={`#${h.id}`}
                      className="no-underline text-gray-600 group-hover:text-gray-900 group-hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(h.id);
                        if (target) {
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                    >
                      <span className="font-medium">{h.number}</span>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AsideWrapper>
        </div>
      </div>
    </AuthGuard>
  );
}

export default function DetailTopic() {
  return (
    <AuthGuard>
      <DetailTopicContent />
    </AuthGuard>
  );
}
