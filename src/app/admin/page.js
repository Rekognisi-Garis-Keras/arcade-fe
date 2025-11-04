"use client";
import AdminGuard from "@/utils/adminGuard";
import React, { Suspense } from "react";
import URLParamToastHandler from "@/components/URLParamToastHandler";

function page() {
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
      <div>page</div>
    </AdminGuard>
  );
}

export default page;
