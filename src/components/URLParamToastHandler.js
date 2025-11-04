// components/URLParamToastHandler.js
"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Komponen untuk menangani efek samping (side effect) berbasis parameter URL.
 * Biasanya digunakan untuk menampilkan toast setelah redirect/login.
 * * @param {object} props
 * @param {string} paramName - Nama parameter URL yang dicari (contoh: "loggedIn").
 * @param {string} paramValue - Nilai parameter URL yang memicu aksi (contoh: "true").
 * @param {string} toastMessage - Pesan utama di toast (contoh: "Login berhasil!").
 * @param {string} toastDescription - Deskripsi di toast (contoh: "Rasakan pengalaman belajar menggunakan AR🔥").
 * @param {string} [icon='🎉'] - Ikon opsional untuk toast.
 * @param {string} [position='top-center'] - Posisi toast.
 * @param {string} [replacePath] - Path opsional untuk router.replace (contoh: "/subjects"). Jika tidak diisi, tidak ada replace.
 */
export default function URLParamToastHandler({
  paramName,
  paramValue,
  toastMessage,
  toastDescription,
  icon = "🎉",
  position = "top-center",
  replacePath,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Memastikan fungsi router.replace aman dari dependensi yang tidak stabil
  const handleReplace = useCallback(() => {
    if (replacePath) {
      // Melakukan router.replace hanya untuk membersihkan URL
      router.replace(replacePath, { shallow: true });
    }
  }, [router, replacePath]);

  useEffect(() => {
    // 1. Cek apakah parameter yang dicari ada dan nilainya sesuai
    const paramMatch = searchParams.get(paramName) === paramValue;

    if (paramMatch) {
      // 2. Tampilkan Toast
      toast(toastMessage, {
        description: toastDescription,
        icon: icon,
        position: position,
      });

      // 3. Hapus parameter dari URL setelah toast ditampilkan
      // Delay sedikit untuk memberi waktu toast muncul sebelum URL dibersihkan
      const timeoutId = setTimeout(() => {
        handleReplace();
      }, 50); // Delay kecil agar transisi terlihat mulus

      return () => clearTimeout(timeoutId);
    }

    // Cleanup useEffect jika komponen di-unmount
    return undefined;
  }, [
    searchParams,
    paramName,
    paramValue,
    toastMessage,
    toastDescription,
    icon,
    position,
    handleReplace, // useCallback menjamin fungsi ini stabil
  ]);

  // Komponen ini tidak merender elemen visual.
  return null;
}
