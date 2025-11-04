import AdminGuard from "@/utils/adminGuard";
import React from "react";

function page() {
   return (
      <AdminGuard>
         <div>page</div>
      </AdminGuard>
   );
}

export default page;
