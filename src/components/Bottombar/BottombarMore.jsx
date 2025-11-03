"use client";

import { useState } from "react";
import { Button } from "@/components/UI/button";
import Image from "next/image";
import Link from "next/link";
import { CircleQuestionMark, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const BottomMore = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="relative flex justify-center">
      {/* tombol More */}
      <div onClick={() => setOpen(!open)} className="relative">
        <Button
          className="justify-center h-[52px] w-[52px] rounded-xl p-0 cursor-pointer"
          variant="sidebar"
        >
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg"
            alt="More"
            width={30}
            height={30}
          />
        </Button>

        {/* Popup muncul di atas tombol */}
        {open && (
          <div className="absolute bottom-full right-3 mb-2">
            <div className="relative bg-white border shadow-lg rounded-2xl p-2 w-40">
              <Button
                variant="sidebar"
                className="w-full justify-start rounded-lg cursor-pointer"
              >
                <Link
                  href="/help"
                  className="flex gap-x-2 py-2 rounded-md w-full text-left -translate-x-[3px]"
                >
                  <CircleQuestionMark />
                  <span>Help</span>
                </Link>
              </Button>
              <Button
                variant="dangerOutline"
                className="w-full justify-start rounded-lg"
                onClick={handleLogout}
              >
                <LogOut />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomMore;
