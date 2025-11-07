import ContentWrapper from "@/components/Leaderboard/ContentWrapper";
import StickyWrapper from "@/components/Leaderboard/StickyWrapper";
import Image from "next/image";
import React from "react";

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

function page() {
  const leaderboardData = [
    {
      position: 1,
      iconProfile: "https://randomuser.me/api/portraits/men/10.jpg",
      name: "Oliver Smith",
      xp: 980,
    },
    {
      position: 2,
      iconProfile: "https://randomuser.me/api/portraits/women/22.jpg",
      name: "Emma Johnson",
      xp: 940,
    },
    {
      position: 3,
      iconProfile: "https://randomuser.me/api/portraits/men/33.jpg",
      name: "Liam Williams",
      xp: 910,
    },
    {
      position: 4,
      iconProfile: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Sophia Brown",
      xp: 880,
    },
    {
      position: 5,
      iconProfile: "https://randomuser.me/api/portraits/men/55.jpg",
      name: "Noah Jones",
      xp: 850,
    },
    {
      position: 6,
      iconProfile: "https://randomuser.me/api/portraits/women/66.jpg",
      name: "Ava Garcia",
      xp: 820,
    },
    {
      position: 7,
      iconProfile: "https://randomuser.me/api/portraits/men/77.jpg",
      name: "Elijah Martinez",
      xp: 790,
    },
    {
      position: 8,
      iconProfile: "https://randomuser.me/api/portraits/women/88.jpg",
      name: "Isabella Rodriguez",
      xp: 760,
    },
    {
      position: 9,
      iconProfile: "https://randomuser.me/api/portraits/men/99.jpg",
      name: "James Davis",
      xp: 730,
    },
    {
      position: 10,
      iconProfile: "https://randomuser.me/api/portraits/women/11.jpg",
      name: "Mia Wilson",
      xp: 700,
    },
  ];

  return (
    <div className="flex flex-row-reverse gap-2 px-6 pb-30 md:pb-0">
      <StickyWrapper>
        <div className="mt-5 border-3 w-full min-h-30 rounded-xl shadow-xs justify-evenly flex items-center p-3">
          <div className="text-5xl">🏅</div>
          <div className="flex flex-col items-start gap-y-1">
            <p className="text-xs text-gray-800 ">
              Sekarang kamu di <br /> posisi ke-
            </p>
            <h3 className="text-4xl font-bold">14</h3>
          </div>
        </div>
      </StickyWrapper>
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
        <div className="relative w-full overflow-x-auto rounded-xl border-2 border-b-4">
          <Table>
            <TableCaption className="p-5 mt-0 border-t-2">
              Setiap jawaban benar di kuis = +10 XP! 💥 <br /> Yuk terus latihan
              dannaik ke posisi teratas leaderboard! 🚀
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
                of={leaderboardData}
                render={(item, index) => (
                  <TableRow key={index}>
                    {item.position === 1 ? (
                      <TableCell className="font-bold py-5 text-sky-500 text-xl text-center">
                        {item.position}
                      </TableCell>
                    ) : item.position === 2 ? (
                      <TableCell className="font-bold py-5 text-green-500 text-lg text-center">
                        {item.position}
                      </TableCell>
                    ) : item.position === 3 ? (
                      <TableCell className="font-bold py-5 text-yellow-500 text-md text-center">
                        {item.position}
                      </TableCell>
                    ) : (
                      <TableCell className="font-semibold py-5 text-center text-gray-800">
                        {item.position}
                      </TableCell>
                    )}
                    <TableCell className="flex py-5 text-gray-800 items-center gap-3">
                      <Avatar>
                        <AvatarImage src={item.iconProfile} alt={item.name} />
                      </Avatar>
                      <span className="font-medium text-md tracking-wide text-gray-800">
                        {item.name}
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
      </ContentWrapper>
    </div>
  );
}

export default page;
