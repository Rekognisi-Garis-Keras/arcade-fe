"use client";

import { Button } from "@/components/UI/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SidebarItem = ({ label, iconSrc, href }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      className="lg:justify-start justify-center h-52px p-0 lg:px-4 lg:py-2"
      variant={active ? "sidebarOutline" : "sidebar"}
      asChild
    >
      <Link href={href}>
        <Image
          className="lg:mr-2"
          height={25}
          width={25}
          src={iconSrc}
          alt={label}
        />
        <span className="hidden lg:inline">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
