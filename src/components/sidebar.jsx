import React from "react";
import Image from "next/image";
import Link from "next/link";

import SidebarItem from "@/components/sidebar-item";
import SidebarMore from "./sidebar-more";

const Sidebar = () => {
  return (
    <div className="h-full w-64 fixed left-0 top-0 px-4 border-r-2 flex-col">
      <Link href="/subjects">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-2">
          <Image src="/logo.png" height={40} width={40} alt="Logo"></Image>
          <h1 className="text-2xl font-extrabold text-blue-950 tracking-wide">
            ARcade
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Subject"
          href="/subjects"
          iconSrc="https://d35aaqx5ub95lt.cloudfront.net/vendor/3390675b86eeeab0b4119ccfcb5b186e.svg"
        />
        <SidebarItem label="Profile" href="/profile" iconSrc="/medium.png" />
        <SidebarMore />
      </div>
    </div>
  );
};

export default Sidebar;
