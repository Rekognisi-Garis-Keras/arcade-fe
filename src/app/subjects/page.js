"use client";

import React from "react";
import List from "@/components/CardSubjects/List";
import AuthGuard from "@/utils/authGuard";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Subjects() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = searchParams.get("loggedIn") === "true";
    if (isLoggedIn) {
      toast("Login berhasil!", {
        description: "Rasakan pengalaman belajar menggunakan AR🔥",
        icon: "🎉",
        position: "top-center",
      });
      router.replace("/subjects", { shallow: true });
    }
  }, [searchParams, router]);

  return (
    <AuthGuard>
      <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">Mata Pelajaran</h1>
        <List />
      </div>
    </AuthGuard>
  );
}
