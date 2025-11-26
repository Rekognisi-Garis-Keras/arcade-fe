import React from "react";
import TopicTable from "@/components/Admin/Topics/TopicTable";
import AdminGuard from "@/utils/adminGuard";

export default function AdminTopics() {
  return (
    <AdminGuard>
      <TopicTable />
    </AdminGuard>
  );
}
