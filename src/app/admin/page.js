"use client";
import AdminGuard from "@/utils/adminGuard";
import React, { Suspense } from "react";
import URLParamToastHandler from "@/components/URLParamToastHandler";
import SubjectTable from "@/components/Admin/Subjects/SubjectTable";

export default function AdminSubjects() {
  return (
    <AdminGuard>
      <Suspense fallback={null}>
        <URLParamToastHandler
          paramName="loggedIn"
          paramValue="true"
          toastMessage="Kamu berhasil login sebagai guru"
          icon="👨🏻‍🏫"
          replacePath="/admin"
        />
      </Suspense>
      <SubjectTable />
    </AdminGuard>
  );
}
