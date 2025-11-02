"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
   const router = useRouter();
   const [checking, setChecking] = useState(true);

   useEffect(() => {
      const checkAuth = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            router.replace("/login");
            return;
         }

         try {
            const res = await fetch("https://api-arcade.vercel.app/auth/user", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (!res.ok) {
               throw new Error("Not authorized");
            }

            // optional: simpan user info kalau mau
            // const user = await res.json();
            setChecking(false); // auth valid, lanjut render
         } catch (err) {
            localStorage.removeItem("token"); // hapus token yang invalid
            router.replace("/login"); // redirect ke login
         }
      };

      checkAuth();
   }, [router]);

   if (checking) {
      return (
         <div className="h-screen w-screen flex items-center justify-center text-gray-600">
            <p>Memeriksa sesi login...</p>
         </div>
      );
   }

   return <>{children}</>;
}
