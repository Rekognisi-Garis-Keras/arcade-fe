"use client";

import { useState, useEffect } from "react";
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
import { apiRequest } from "@/utils/api";
import AuthGuard from "@/utils/authGuard";

export default function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditBioOpen, setIsEditBioOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telp, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("/medium.webp");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await apiRequest("/auth/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === "success" && res.data) {
          const user = res.data;
          setName(user.name || "-");
          setEmail(user.email || "-");
          setBio(user.bio || "-");
          setAvatar(user.avatar || "/medium.png");
          setPhone(user.phone || "-");
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <AuthGuard>
      <main className="p-10 w-full min-h-screen pb-20">
        {/* profile picture card */}
        <div className="flex md:flex-row flex-col border-2 border-b-4 rounded-xl p-5 gap-5 items-center">
          <Image
            src={avatar}
            alt="Profile picture"
            width={100}
            height={100}
            className="rounded-full border-4 border-sky-500"
          />
          <div className="flex flex-col md:items-start items-center h-full justify-between gap-y-3">
            <h1 className="text-lg font-bold">Profile Picture</h1>

            <Button variant={"primary"} size={"sm"}>
              <Upload />
              Upload foto kamu
            </Button>
            <div>
              <p className="text-xs text-gray-400">
                File yang disupport: .png, .jpg  .jpeg
              </p>
              <p className="text-xs text-gray-400">File maksimal berukuran 10MB</p>
            </div>
          </div>
        </div>

        <hr className="my-5 border-2 rounded-full" />

        {/* informasi pribadi card */}
        <div className="border-2 border-b-4 rounded-xl p-5 pb-10 mb-5">
          <div className="flex justify-between mb-5 items-center">
            <h1 className="text-lg font-bold">Informasi Pribadi</h1>
            <Button onClick={() => setIsEditOpen(true)}>
              <SquarePen />
            </Button>
          </div>
          <div className="flex gap-2 md:flex-row flex-col gap-y-3">
            <div className="w-full">
              <h3 className="font-semibold ">Nama</h3>
              <p className="text-sm text-gray-500">{name}</p>
            </div>
            <div className="w-full">
              <h3 className="font-semibold ">Email</h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
            <div className="w-full">
              <h3 className="font-semibold ">Nomor Telepon</h3>
              <p className="text-sm text-gray-500">{telp}</p>
            </div>
          </div>
        </div>

        {/* bio card */}
        <div className="w-full rounded-xl p-5 border-2 border-b-4">
          <div className="flex justify-between mb-5 items-center">
            <h1 className="text-lg font-bold">Bio</h1>
            <Button onClick={() => setIsEditBioOpen(true)}>
              <SquarePen />
            </Button>
          </div>
          <p className="text-gray-500">{bio}</p>
        </div>

        {/* Edit Dialog */}
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
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <Input value={telp} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsEditOpen(false)} variant={"secondary"}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setIsEditBioOpen(false)}
                variant={"secondary"}
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </AuthGuard>
  );
}
