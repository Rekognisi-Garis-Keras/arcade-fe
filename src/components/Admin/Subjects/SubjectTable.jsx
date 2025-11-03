"use client";

import { Button } from "@/components/UI/button";
import { SquarePen, Trash, Plus, Search } from "lucide-react";
import { useState } from "react";
import SubjectFormDialog from "./SubjectFormDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../../UI/input";

const initialSubjects = [
  {
    id: 1,
    name: "Astronomy",
    description: "Study of celestial objects",
    slug: "/subjects/astronomy",
    iconPath: "/icons/telescope.svg",
  },
  {
    id: 2,
    name: "Physics",
    description: "Study of matter and energy",
    slug: "/subjects/physics",
    iconPath: "/icons/atom.svg",
  },
];

const SubjectTable = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [dialogMode, setDialogMode] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    iconPath: "",
  });
  const [searchInput, setSearchInput] = useState("");

  const openEdit = (subject) => {
    setDialogMode("edit");
    setFormData(subject);
  };

  const openAdd = () => {
    setDialogMode("add");
    setFormData({ name: "", description: "", slug: "", iconPath: "" });
  };

  const saveEdit = () => {
    setSubjects(subjects.map((s) => (s.id === formData.id ? formData : s)));
    setDialogMode(null);
  };

  const saveAdd = () => {
    setSubjects([
      ...subjects,
      { ...formData, id: Math.max(...subjects.map((s) => s.id), 0) + 1 },
    ]);
    setDialogMode(null);
  };

  const deleteSubject = () => {
    setSubjects(subjects.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold text-left mb-5">Mata Pelajaran</h1>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Cari data..."
              className={"border border-b-4 border-r-4"}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="primary" className="cursor-pointer">
              {searchInput}
              <Search />
            </Button>
          </div>
          <Button
            onClick={openAdd}
            className="gap-2 cursor-pointer"
            variant={"primary"}
          >
            <Plus size={20} /> Tambah Mata Pelajaran
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Deskripsi
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Icon
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subjects.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4">{s.description}</td>
                <td className="px-6 py-4">{s.slug}</td>
                <td className="px-6 py-4">
                  {s.iconPath && (
                    <Avatar>
                      <AvatarImage src={s.iconPath} alt="atom" />
                      <AvatarFallback>PY</AvatarFallback>
                    </Avatar>
                  )}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="editProfile"
                    onClick={() => openEdit(s)}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <SquarePen size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="delete"
                    onClick={() => setDeleteId(s.id)}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialogs */}
      {dialogMode && (
        <SubjectFormDialog
          open={!!dialogMode}
          onOpenChange={() => setDialogMode(null)}
          mode={dialogMode}
          formData={formData}
          onChange={(f, v) => setFormData({ ...formData, [f]: v })}
          onSubmit={dialogMode === "edit" ? saveEdit : saveAdd}
        />
      )}

      {deleteId && (
        <ConfirmDeleteDialog
          open={!!deleteId}
          onOpenChange={() => setDeleteId(null)}
          onConfirm={deleteSubject}
        />
      )}
    </div>
  );
};

export default SubjectTable;
