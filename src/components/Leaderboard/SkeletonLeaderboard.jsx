"use client";
import ContentWrapper from "@/components/DetailSubject/ContentWrapper";
import { Skeleton } from "@/components/UI/skeleton";
import React, { useEffect, useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";

function page() {
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(0);
  const [tableLeft, setTableLeft] = useState(0);
  useEffect(() => {
    // resize width table
    const updateDimensions = () => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        setTableWidth(rect.width);
        setTableLeft(rect.left);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", updateDimensions);
    };
  }, []);
  return (
    <div className="flex flex-row-reverse gap-2 pb-30 md:pb-0">
      <div className="hidden lg:block w-[300px] sticky top-6 self-end bottom-6">
        <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
          <div className="mt-5 border-3 w-full min-h-30 rounded-xl shadow-xs justify-evenly flex items-center p-3">
            <Skeleton className="w-15 h-15" />
            <div className="flex flex-col items-start gap-y-1">
              <Skeleton className="w-16 h-2" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="w-18 h-2" />
            </div>
          </div>
        </div>
      </div>
      <ContentWrapper>
        <div className="w-full flex flex-col justify-center items-center p-5 border-2 mb-5 border-b-4 border-r-4 rounded-xl">
          <Skeleton className="w-15 h-15 rounded-md mb-5" />
          <Skeleton className="w-50 h-5 rounded-md mb-2" />
          <Skeleton className="w-[80%] h-3 rounded-md" />
        </div>
        {/*  */}

        <div
          ref={tableRef}
          className="relative w-full overflow-x-auto rounded-xl border-2 border-b-4 mb-24"
        >
          <Table>
            <TableCaption className="p-5 mt-0 border-t-2">
              <Skeleton className="w-[60%] h-4 mb-2" />
              <Skeleton className="w-[80%] h-4" />
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-20 py-5 text-center">
                  <Skeleton className="w-5 h-5 mx-auto rounded-sm" />
                </TableHead>
                <TableHead className="font-bold py-5">
                  <Skeleton className="h-5 w-10" />
                </TableHead>
                <TableHead className="font-bold py-5">
                  <Skeleton className="w-10 h-5" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-semibold py-5 text-center text-gray-800">
                    <Skeleton className="h-5 w-2 rounded-sm mx-auto" />
                  </TableCell>
                  <TableCell className="flex py-5 text-gray-800 items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="w-20 h-3" />
                  </TableCell>
                  <TableCell className="py-5 text-gray-800">
                    <Skeleton className="w-7 h-5 rounded-sm" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div
          className="fixed md:bottom-5 bottom-25  bg-white border-2 border-b-4 border-r-4 rounded-xl shadow-lg z-50 transition-all duration-300"
          style={{
            width: tableWidth > 0 ? `${tableWidth}px` : "auto",
            left: tableLeft > 0 ? `${tableLeft}px` : "auto",
          }}
        >
          <div className="flex items-center">
            <div className="font-semibold py-5 text-center text-gray-800 w-20 shrink-0">
              <Skeleton className="h-5 w-2 rounded-sm mx-auto" />
            </div>
            <div className="flex py-5 text-gray-800 items-center gap-3 flex-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="w-20 h-3" />
            </div>
            <div className="py-5 text-gray-800 lg:w-25 pr-6">
              <Skeleton className="w-7 h-5 rounded-sm" />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default page;
