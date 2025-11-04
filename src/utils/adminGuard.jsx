"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FourSquare } from "react-loading-indicators";
import { apiRequest } from "@/utils/api";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await apiRequest("/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res?.data;

        if (!user || user.role !== "admin") {
          router.push("/subjects");
          return;
        }

        setChecking(false);
      } catch (err) {
        console.error("AdminGuard error:", err);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center text-gray-600">
        <FourSquare
          color={["#2bb3ff", "#2b97ff", "#2b7fff", "#2b60ff"]}
          size="large"
          text="Loading..."
          textColor="#45556c"
        />
      </div>
    );
  }

  return <>{children}</>;
}
