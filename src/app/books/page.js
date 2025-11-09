"use client";
import React, { useState } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Search } from "lucide-react";
import CardBooks from "@/components/Books/CardBooks";
import EachUtils from "@/utils/EachUtils";

import { LIST_BOOKS } from "@/constants/listBooks";

function page() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col max-w-[912px] mx-auto px-3 gap-y-5 mt-10 pb-30">
      <div className="flex flex-col items-start gap-y-2">
        <h1 className="font-bold text-3xl">Books</h1>
        <p>
          Kumpulan buku yang di dalamnya ada banyak AR yang bisa kamu explore
        </p>
      </div>
      <div className="flex items-center gap-x-2 max-w-[350px]">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant={"primary"}>
          <Search />
        </Button>
      </div>

      <div className="w-full">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          <EachUtils
            of={LIST_BOOKS}
            render={(item, index) => (
              <CardBooks
                key={index}
                imgUrl={item.image}
                title={item.title}
                description={item.description}
                btnUrl={item.url}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
export default page;
