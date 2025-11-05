"use client";
import React from "react";
import BottombarItem from "./BottombarItem";
import BottomMore from "./BottombarMore";
import EachUtils from "@/utils/EachUtils";

import { LIST_SIDEBAR_ADMIN } from "@/constants/listSidebarAdmin";

const Bottombar = () => {
  return (
    <div className="h-19 border-t-2 border-neutral-200 bg-white py-4 px-8 fixed bottom-0 left-0 w-full z-9999">
      <div className="flex flex-row items-center justify-between h-full">
        <EachUtils
          of={LIST_SIDEBAR_ADMIN}
          render={(item) => (
            <BottombarItem
              label={item.label}
              iconSrc={item.icon}
              href={item.path}
              key={item.path}
            />
          )}
        />
        <BottomMore />
      </div>
    </div>
  );
};

export default Bottombar;
