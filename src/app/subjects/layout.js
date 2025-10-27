import Sidebar from "@/components/sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="pl-64 h-full">
        <div className="bg-red-500 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
