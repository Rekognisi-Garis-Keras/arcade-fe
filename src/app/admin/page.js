"use client";
import AdminGuard from "@/utils/adminGuard";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = searchParams.get("loggedIn") === "true";
    if (isLoggedIn) {
      toast.message("Kamu berhasil login sebagai guru", {
        icon: "👨🏻‍🏫",
      });
    }
  }, [searchParams, router]);
  return (
    <AdminGuard>
      <div>page</div>
    </AdminGuard>
  );
}

export default page;
