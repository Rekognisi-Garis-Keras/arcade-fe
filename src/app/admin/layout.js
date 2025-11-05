import Bottombar from "@/components/Admin/Navigation/Bottombar";
import Sidebar from "@/components/Admin/Navigation/Sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="lg:pl-64 md:pl-20 h-full pb-20 md:pb-0">
        <div className="h-full max-w-[1204px] mx-auto pt-6">{children}</div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 w-full">
        <Bottombar />
      </div>
    </>
  );
};

export default MainLayout;
