import React from "react";
import List from "@/components/CardSubjects/List";
import AuthGuard from "@/utils/authGuard";

export default function Subjects() {
  return (
    <AuthGuard>
      <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">Mata Pelajaran</h1>
        <List />
      </div>
    </AuthGuard>
  );
};
