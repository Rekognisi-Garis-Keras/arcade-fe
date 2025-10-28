import React from "react";
import Image from "next/image";
import Link from "next/link";

import SidebarItem from "@/components/sidebar-item";
import SidebarMore from "./sidebar-more";

const Sidebar = () => {
  return (
    <div
      className="
    hidden md:w-20 md:flex lg:w-64 lg:flex h-screen fixed left-0 top-0 px-4 border-r-2 flex-col justify-between"
    >
      <div>
        <Link href="/subjects">
          <div className="pt-8 lg:pl-4 pb-7 justify-center lg:justify-start flex items-center gap-x-2">
            <Image src="/logo.png" height={40} width={40} alt="Logo"></Image>
            <h1 className="hidden lg:block text-2xl font-extrabold text-blue-950 tracking-wide">
              ARcade
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-4 lg:gap-y-2">
          <SidebarItem label="Subject" href="/subjects" iconSrc="/bumi.svg" />
          <SidebarItem label="Profile" href="/profile" iconSrc="/medium.png" />
        </div>
      </div>

      {/* This will stick to the bottom */}
      <div className="pb-4">
        <SidebarMore />
      </div>
    </div>
  );
};

export default Sidebar;
