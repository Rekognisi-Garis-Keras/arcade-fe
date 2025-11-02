"use client";

import React from "react";
import Form from "@/components/Signup/Form";
import FloatingImages from "@/components/Landing/FloatingImages";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen relative flex items-center justify-center">
      <div className="md:shadow-xs bg-white md:border-2 py-6 px-7 rounded-xl w-[400px]">
        <FloatingImages />
        <Form />
      </div>
    </div>
  );
}
