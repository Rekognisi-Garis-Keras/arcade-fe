"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const BottomMore = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center">
      {/* tombol More */}
      <div onClick={() => setOpen(!open)} className="relative">
        <Button
          className="justify-center h-[52px] w-[52px] rounded-xl p-0"
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
          <div className="absolute bottom-full right-3 mb-2 z-40">
            <div className="relative bg-white border shadow-lg rounded-2xl p-2 w-40">
              <Button
                variant="sidebar"
                className="w-full justify-start rounded-lg"
              >
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md w-full text-left"
                >
                  Settings
                </Link>
              </Button>
              <Button
                variant="sidebar"
                className="w-full justify-start rounded-lg"
              >
                <Link
                  href="/help"
                  className="block px-3 py-2 rounded-md w-full text-left"
                >
                  Help
                </Link>
              </Button>
              <Button
                variant="dangerOutline"
                className="w-full justify-start rounded-lg"
              >
                <Link
                  href="/logout"
                  className="block px-3 py-2 rounded-md w-full text-left"
                >
                  Log out
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomMore;
