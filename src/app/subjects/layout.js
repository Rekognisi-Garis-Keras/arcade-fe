import Sidebar from "@/components/sidebar";
import Bottombar from "@/components/Bottombar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="lg:pl-64 pb-19 md:pb-0 md:pl-20 h-full">
        <div className="bg-sky-500 h-full">{children}</div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 w-full">
        <Bottombar />
      </div>
    </>
  );
};

export default MainLayout;
