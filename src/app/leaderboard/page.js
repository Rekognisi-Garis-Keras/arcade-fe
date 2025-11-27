"use client";

import ContentWrapper from "@/components/Leaderboard/ContentWrapper";
import StickyWrapper from "@/components/Leaderboard/StickyWrapper";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import EachUtils from "@/utils/EachUtils";
import { Avatar, AvatarImage } from "@/components/UI/avatar";
import { getLeaderboard } from "@/services/leaderboard";
import AuthGuard from "@/utils/authGuard";

function LeaderboardContent() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myPosition, setMyPosition] = useState({});
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(0);
  const [tableLeft, setTableLeft] = useState(0);

  const fetchLeaderboard = async () => {
    try {
      const response = await getLeaderboard();
      const data = response.data;
      setLeaderboard(data.top_leaderboard);
      setMyPosition(data.my_position);
      // console.log(data.my_position);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

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
    <div className="flex flex-row-reverse gap-2 px-6 pb-30 md:pb-0">
      <div className="hidden lg:block w-[300px] sticky top-6 self-end bottom-6">
        <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
          <div className="mt-5 border-3 w-full min-h-30 rounded-xl shadow-xs justify-evenly flex items-center p-3">
            <div className="text-5xl">🏅</div>
            <div className="flex flex-col items-start gap-y-1">
              <p className="text-xs text-gray-800">
                Sekarang kamu di <br /> posisi ke-
              </p>
              <h3 className="text-4xl font-bold">{myPosition.rank}</h3>
              <p className="text-xs text-gray-800">
                XP kamu saat ini:{" "}
                <span className="font-semibold">{myPosition.xp}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContentWrapper>
        <div className="w-full flex flex-col justify-center items-center p-5 border-2 mb-5 border-b-4 border-r-4 rounded-xl">
          <Image
            src="/leader.png"
            alt="leaderboard"
            width={80}
            height={80}
            className="mb-3"
          />
          <h1 className="font-extrabold text-gray-800 text-2xl uppercase tracking-wide">
            papan skor
          </h1>
          <p className="font-xs text-gray-600">
            Kumpulin XP sebanyak-banyaknya dan tunjukin siapa bintang kuis
            sejati! 🌟
          </p>
        </div>
        {/*  */}
        <div
          ref={tableRef}
          className="relative w-full overflow-x-auto rounded-xl border-2 border-b-4 mb-24"
        >
          <Table>
            <TableCaption className="p-5 mt-0 border-t-2">
              Setiap jawaban benar di kuis = +10 XP! 💥 <br /> Yuk terus latihan
              dan naik ke posisi teratas leaderboard! 🚀
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-20 py-5 text-center">
                  No.
                </TableHead>
                <TableHead className="font-bold py-5">User</TableHead>
                <TableHead className="font-bold py-5">XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <EachUtils
                of={leaderboard}
                render={(item, index) => (
                  <TableRow key={index}>
                    {item.rank === 1 ? (
                      <TableCell className="font-bold py-5 text-sky-500 text-xl text-center">
                        {item.rank}
                      </TableCell>
                    ) : item.rank === 2 ? (
                      <TableCell className="font-bold py-5 text-green-500 text-lg text-center">
                        {item.rank}
                      </TableCell>
                    ) : item.rank === 3 ? (
                      <TableCell className="font-bold py-5 text-yellow-500 text-md text-center">
                        {item.rank}
                      </TableCell>
                    ) : (
                      <TableCell className="font-semibold py-5 text-center text-gray-800">
                        {item.rank}
                      </TableCell>
                    )}
                    <TableCell className="flex py-5 text-gray-800 items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={item.user.avatar ?? `/medium.png`}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                        />
                      </Avatar>
                      <span className="font-medium text-md tracking-wide text-gray-800">
                        {item.user.name}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 text-gray-800">
                      {item.xp}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TableBody>
          </Table>
        </div>

        {/* Fixed bottom bar showing current user position */}
        <div
          className="fixed md:bottom-5 bottom-25  bg-white border-2 border-b-4 border-r-4 rounded-xl shadow-lg z-50 transition-all duration-300"
          style={{
            width: tableWidth > 0 ? `${tableWidth}px` : "auto",
            left: tableLeft > 0 ? `${tableLeft}px` : "auto",
          }}
        >
          <div className="flex items-center">
            <div className="font-semibold py-5 text-center text-gray-800 w-20 shrink-0">
              {myPosition.rank}
            </div>
            <div className="flex py-5 text-gray-800 items-center gap-3 flex-1">
              <Avatar>
                <AvatarImage
                  src={myPosition?.user?.avatar}
                  alt={myPosition?.user?.name}
                />
              </Avatar>
              <span className="font-medium text-md tracking-wide text-gray-800">
                {myPosition?.user?.name}
              </span>
            </div>
            <div className="py-5 text-gray-800 lg:w-25 pr-6">
              {myPosition.xp}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <AuthGuard>
      <LeaderboardContent />
    </AuthGuard>
  );
};
