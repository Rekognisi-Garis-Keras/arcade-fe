"use client";

import Image from "next/image";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { Upload, SquarePen } from "lucide-react";
import { Skeleton } from "@/components/UI/skeleton";

export default function ProfilePage() {
  return (
    <main className="p-10 w-full min-h-screen pb-30">
      {/* profile picture card */}
      <div className="flex md:flex-row flex-col border-2 border-b-4 rounded-xl p-5 gap-5 items-center">
        <Skeleton className="rounded-full h-20 w-20" />
        <div className="flex flex-col md:items-start items-center h-full justify-between gap-y-3">
          {/* profile picture text */}
          <Skeleton className="w-20 h-3" />
          {/* upload button */}
          <Skeleton />

          <div>
            {/* file support */}
            <Skeleton className={"w-20 h-3"} />
            <Skeleton className={"w-20 h-3"} />
          </div>
        </div>
      </div>

      <hr className="my-5 border-2 rounded-full" />

      {/* informasi pribadi card */}
      <div className="border-2 border-b-4 rounded-xl p-5 pb-10 mb-5">
        <div className="flex justify-between mb-5 items-center">
          {/* informasi pribadi */}
          <h1 className="text-lg font-bold">Informasi Pribadi</h1>
          <Button
            onClick={() => {
              setTempPhone(user.phone ?? "");
              setTempEmail(user.email ?? "");
              setTempName(user.name ?? "");
              setIsEditOpen(true);
            }}
            variant={"editProfile"}
          >
            <SquarePen />
          </Button>
        </div>
        <div className="flex gap-2 md:flex-row flex-col gap-y-3">
          <div className="w-full">
            <h3 className="font-semibold ">Nama</h3>
            <p className="text-sm text-gray-500">{user.name}</p>
          </div>
          <div className="w-full">
            <h3 className="font-semibold ">Email</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="w-full">
            <h3 className="font-semibold ">Nomor Telepon</h3>
            <p className="text-sm text-gray-500">{user.phone || "-"}</p>
          </div>
        </div>
      </div>

      {/* bio card */}
      <div className="w-full rounded-xl p-5 border-2 border-b-4">
        <div className="flex justify-between mb-5 items-center">
          <h1 className="text-lg font-bold">Bio</h1>
          <Button
            onClick={() => {
              setTempBio(user.bio ?? "");
              setIsEditBioOpen(true);
            }}
            variant={"editProfile"}
          >
            <SquarePen />
          </Button>
        </div>
        <p className="text-gray-500">{user.bio || "-"}</p>
      </div>

      {/* Edit Informasi Pribadi Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Informasi Pribadi ✏️</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <Input
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveProfile}
              className={"cursor-pointer"}
              variant={"primary"}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Bio Dialog */}
      <Dialog open={isEditBioOpen} onOpenChange={setIsEditBioOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Bio ✏️</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                rows={3}
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveBio}
              className={"cursor-pointer"}
              variant={"primary"}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
