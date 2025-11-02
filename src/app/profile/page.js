"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("Eko Kurniawan Khannedy");
  const [bio, setBio] = useState("Love to learn with AR!");

  return (
    <div className="min-h-screen">
      <main className="flex-1 p-10 flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Profil Kamu 👤
        </h1>

        <Card className="w-full max-w-lg rounded-xl border-2 border-b-4 border-gray-200 bg-white">
          <CardContent className="flex flex-col items-center p-6 space-y-5">
            <div className="relative">
              <Image
                src="/profile.jpg"
                alt="Profile picture"
                width={100}
                height={100}
                className="rounded-full border-4 border-sky-500"
              />
              <Button size={"uploadButton"} variant={"uploadButton"}>
                <Upload className="h-3! w-3!" />
              </Button>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-500">Bergabung pada Juni 2025</p>
            </div>

            {/* Bio Section */}
            <div className="w-full text-center">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Bio 📝
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsEditOpen(true)}
              className="mt-2 bg-sky-500 hover:bg-sky-600 border-none cursor-pointer text-white rounded-lg"
            >
              Edit Profil
            </Button>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profil ✏️</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsEditOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
