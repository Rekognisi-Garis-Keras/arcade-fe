"use client";

import { useState } from "react";
import { Button } from "@/components/UI/button";
import Image from "next/image";
import Link from "next/link";
import { CircleQuestionMark, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const SidebarMore = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        className="lg:justify-start justify-center h-[52px] w-full lg:px-4 lg:py-2 p-0"
        variant="sidebar"
      >
        <Image
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg"
          alt="More"
          width={25}
          height={25}
          className="lg:mr-2"
        />
        <span className="hidden lg:inline">More</span>
      </Button>

      {open && (
        <div className="absolute left-full bottom-0 ml-0.5 z-40">
          <div className="absolute -left-2 bottom-0 w-2 h-full"></div>

          <div className="relative w-50 bg-white shadow-lg rounded-2xl border gap-x-2 p-2">
            <Button variant={"sidebar"} className="w-full justify-start">
              <Link
                href="/help"
                className="py-2 flex gap-x-2 rounded-md -translate-x-[3px]"
              >
                <CircleQuestionMark strokeWidth={2.5} size={100} />
                <span>Help</span>
              </Link>
            </Button>
            <Button variant={"dangerOutline"} className="w-full justify-start" onClick={handleLogout}>
                <LogOut strokeWidth={3} size={1} />
                <span>Log out</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMore;
