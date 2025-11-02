"use client";

import React from "react";
import Form from "./Form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="md:border-2 md:shadow-xs py-6 px-7 md:border-slate-200 rounded-xl w-[400px]">
        <Form />
      </div>
    </div>
  );
}
