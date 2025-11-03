"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallbackPage() {
   const router = useRouter();

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
         localStorage.setItem("token", token);
         router.push("/subjects");
      } else {
         alert("Login gagal!");
         router.push("/login");
      }
   }, [router]);

   return <p>Login via Google, tunggu sebentar...</p>;
}
