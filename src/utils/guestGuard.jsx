"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestGuard({ children }) {
   const router = useRouter();
   const [checking, setChecking] = useState(true);

   useEffect(() => {
      const checkGuest = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            // Tidak ada token → render halaman login/register
            setChecking(false);
            return;
         }

         try {
            const res = await fetch("https://api-arcade.vercel.app/auth/user", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (res.ok) {
               // Token valid → redirect ke subjects
               router.push("/subjects");
            } else {
               // Token invalid → hapus dan render halaman
               localStorage.removeItem("token");
               setChecking(false);
            }
         } catch (err) {
            localStorage.removeItem("token");
            setChecking(false);
         }
      };

      checkGuest();
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
