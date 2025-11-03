"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TopicWrapper from "@/components/DetailTopic/TopicWrapper";
import AsideWrapper from "@/components/DetailTopic/AsideWrapper";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import AuthGuard from "@/utils/authGuard";
import { apiRequest } from "@/utils/api";

export default function DetailTopic() {
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
          router.replace("/not-found");
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
        setHtmlContent(div.innerHTML); // simpan HTML yang sudah dikasih id
        setTopic(res.data);
      } catch (err) {
        console.error("Failed to fetch topic:", err);
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [subjectSlug, topicSlug, router]);

  if (loading) return <p>Loading...</p>;
  if (!topic) return null;

  return (
    <AuthGuard>
      <div className="flex flex-col gap-3 lg:gap-12 px-6">
        <NavbarTopic title={topic.title} slug={subjectSlug} />
        <div className="flex gap-6 material">
          <TopicWrapper className="material">
            <div
              id="topic-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose max-w-full"
            />
          </TopicWrapper>

          <AsideWrapper>
            <div className="sticky top-24">
              <h3 className="font-semibold mb-2">Daftar Isi</h3>
              <ul className="text-sm space-y-1">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className={`ml-${
                      (h.level - 1) * 3
                    } hover:underline cursor-pointer`}
                  >
                    <a
                      href={`#${h.id}`}
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
