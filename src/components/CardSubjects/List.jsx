"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CardSubjects/SubjectCard";
import Link from "next/link";
import { apiRequest } from "@/utils/api";

const List = () => {
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

        if (res.status === "success") {
          setSubjects(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (subjects.length === 0) return <p>Tidak ada mata pelajaran tersedia</p>;

  return (
    <div className="pt-6 grid grid-cols-1 pb-20 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4">
      {subjects.map((item) => (
        <Link href={`/subjects/${item.slug}`} key={item.id}>
          <CourseCard
            icon={item.thumbnail}
            subject={item.name}
            description={item.desc}
          />
        </Link>
      ))}
    </div>
  );
};

export default List;
