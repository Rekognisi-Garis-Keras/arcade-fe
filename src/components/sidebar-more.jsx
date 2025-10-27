"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SidebarMore = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button className="justify-start h-[52px] w-full" variant="sidebar">
        <Image
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg"
          alt="More"
          width={25}
          height={25}
          className="mr-2"
        />
        More
      </Button>

      {/* “Bridge” transparan biar hover nggak terputus */}
      {open && (
        <div className="absolute left-full top-0 ml-0.5 z-40">
          <div className="absolute -left-2 top-0 w-2 h-full bg-transparent"></div>

          <div className="relative w-48 bg-white shadow-lg rounded-2xl border gap-x-2 p-2">
            <Button variant={"sidebar"} className="w-full justify-start">
              <Link href="/settings" className="block px-3 py-2 rounded-md">
                Settings
              </Link>
            </Button>
            <Button variant={"sidebar"} className="w-full justify-start">
              <Link href="/help" className="block px-3 py-2 rounded-md">
                Help
              </Link>
            </Button>
            <Button variant={"dangerOutline"} className="w-full justify-start">
              <Link href="/logout" className="block px-3 py-2 rounded-md">
                Log out
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMore;
