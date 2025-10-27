"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SidebarItem = ({ label, iconSrc, href }) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      className="justify-start h-52px"
      variant={active ? "sidebarOutline" : "sidebar"}
      asChild
    >
      <Link href={href}>
        <Image
          className="mr-2"
          height={25}
          width={25}
          src={iconSrc}
          alt={label}
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
