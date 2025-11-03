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

export default function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditBioOpen, setIsEditBioOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // state untuk edit sementara
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempBio, setTempBio] = useState("");

  // ambil data user
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await apiRequest("/auth/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === "success" && res.data) {
        setUser(res.data);
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // update informasi pribadi
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = {
        name: tempName,
        email: tempEmail,
        phone: tempPhone,
      };

      await apiRequest("/user/profile", {
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditOpen(false);
      await fetchUser(); // refresh data
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  // update bio
  const handleSaveBio = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = { bio: tempBio };

      await apiRequest("/user/profile", {
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditBioOpen(false);
      await fetchUser();
    } catch (err) {
      console.error("Failed to update bio:", err);
    }
  };

  // upload avatar
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);

      await apiRequest("/user/avatar", {
        method: "PUT",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
        isFormData: true, // kita akan handle di apiRequest
      });

      await fetchUser();
    } catch (err) {
      console.error("Failed to upload avatar:", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User data not found</p>;

  return (
    <main className="p-10 w-full min-h-screen pb-20">
      {/* profile picture card */}
      <div className="flex md:flex-row flex-col border-2 border-b-4 rounded-xl p-5 gap-5 items-center">
        <Image
          src={user.avatar || "/medium.png"}
          alt="Profile picture"
          width={100}
          height={100}
          className="rounded-full border-4 border-sky-500 aspect-square object-cover object-center"
        />
        <div className="flex flex-col md:items-start items-center h-full justify-between gap-y-3">
          <h1 className="text-lg font-bold">Profile Picture</h1>

          <Button
            variant={"primary"}
            size={"sm"}
            onClick={() => document.getElementById("avatarInput").click()}
          >
            <Upload />
            Upload foto kamu
          </Button>
          <input
            type="file"
            id="avatarInput"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleUploadAvatar}
          />

          <div>
            <p className="text-xs text-gray-400">
              File yang disupport: .png .jpg .jpeg
            </p>
            <p className="text-xs text-gray-400">
              File maksimal berukuran 10MB
            </p>
          </div>
        </div>
      </div>

      <hr className="my-5 border-2 rounded-full" />

      {/* informasi pribadi card */}
      <div className="border-2 border-b-4 rounded-xl p-5 pb-10 mb-5">
        <div className="flex justify-between mb-5 items-center">
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
