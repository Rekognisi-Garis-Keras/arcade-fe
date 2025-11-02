"use client";

import React from "react";
import Form from "@/components/Signup/Form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="md:shadow-xs md:border-2 py-6 px-7 rounded-xl w-[400px]">
        <Form />
      </div>
    </div>
  );
}
