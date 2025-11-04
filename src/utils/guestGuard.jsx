"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FourSquare } from "react-loading-indicators";
import { apiRequest } from "@/utils/api";

export default function GuestGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkGuest = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setChecking(false);
        return;
      }

      try {
        await apiRequest("/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        router.push("/subjects");
      } catch (err) {
        console.error("GuestGuard error:", err);
        localStorage.removeItem("token");
        setChecking(false);
      }
    };

    checkGuest();
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
