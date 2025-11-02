"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../UI/button";

const HeaderLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // kalau udah scroll lebih dari 10px, ubah jadi true
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-transparent ${
        isScrolled ? "border-b-2 border-steal-200" : "border-b-0"
      }`}
    >
      <nav className="flex h-16 max-w-[988px] mx-auto justify-between items-center lg:px-3 px-10">
        <Link href="/subjects">
          <div className="justify-center lg:justify-start flex items-center gap-x-2">
            <Image src="/logo.png" height={40} width={40} alt="Logo" />
            <h1 className="md:block hidden text-2xl font-extrabold text-blue-950">
              ARcade
            </h1>
          </div>
        </Link>

        <Button size={"sm"} className="w-24" asChild variant="primary">
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
};

export default HeaderLanding;
