// app/subjects/LoginToastHandler.js
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginToastHandler() {
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
      // Penting: Pastikan Anda hanya mengganti URL setelah toast
      router.replace("/subjects", { shallow: true });
    }
  }, [searchParams, router]);

  // Komponen ini tidak merender apa-apa secara visual, hanya menjalankan efek samping (side effect)
  return null;
}
