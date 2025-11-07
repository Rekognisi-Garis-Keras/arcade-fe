"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/UI/input";
import { ChevronRight, Search } from "lucide-react";

function page() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-y-5 mt-10">
      <div className="flex flex-col items-start gap-y-2">
        <h1 className="font-bold text-3xl">Books</h1>
        <p>
          Kumpulan buku yang di dalamnya ada banyak AR yang bisa kamu explore
        </p>
      </div>
      <div className="flex items-center gap-x-2 max-w-[350px]">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button>
          <Search />
        </Button>
      </div>

      <div className="w-full bg-lime-100 grid grid-cols-4">
        <Card className="pt-0">
          <CardContent className="px-0">
            <img
              src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto"
              alt="Banner"
              className="w-full h-30 rounded-t-xl object-cover aspect-video"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Tata Surya</CardTitle>
            <CardDescription>
              Pelajari planet-planet yang ada di galaxy bima sakti
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href="/books"
              className="group cursor-pointer flex items-center hover:underline"
            >
              Akses Buku
              <ChevronRight
                strokeWidth={1}
                size={23}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
export default page;
