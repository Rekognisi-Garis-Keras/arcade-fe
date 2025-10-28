"use client";
import React from "react";
import BottombarItem from "./BottmbarItem";
import SidebarMore from "./sidebar-more";
import BottomMore from "./BottombarMore";

const Bottombar = () => {
  return (
    <div className="h-19 py-4 px-8 fixed bottom-0 left-0 w-full">
      <div className="flex flex-row items-center justify-between h-full">
        <BottombarItem label="" iconSrc="/bumi.svg" href="/subjects" />
        <BottombarItem label="" iconSrc="/medium.png" href="/profile" />
        <BottomMore />
      </div>
    </div>
  );
};

export default Bottombar;
