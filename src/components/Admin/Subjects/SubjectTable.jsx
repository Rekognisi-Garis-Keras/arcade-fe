"use client";

import { Button } from "@/components/UI/button";
import { SquarePen, Trash, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import SubjectFormDialog from "./SubjectFormDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"; // Asumsi Anda punya komponen ini
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Input } from "../../UI/input";
import { apiRequest } from "@/utils/api";

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
import SkeletonAdmin from "@/app/admin/skeleton";

const SubjectTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [dialogMode, setDialogMode] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    slug: "",
    iconPath: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); // State untuk file biner
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading form
  const [error, setError] = useState(null);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await apiRequest("/subjects", {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === "success" && Array.isArray(res.data)) {
        const mapped = res.data.map((s) => ({
          id: s.id,
          name: s.name,
          description: s.desc || s.description || "",
          slug: `/${s.slug}`,
          iconPath: s.thumbnail || "",
        }));
        setSubjects(mapped);
        setFilteredSubjects(mapped);
      } else {
        setSubjects([]);
        setFilteredSubjects([]);
      }
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
      setSubjects([]);
      setFilteredSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // filter berdasarkan search input
  useEffect(() => {
    const filtered = subjects.filter((s) =>
      s.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [searchInput, subjects]);

  const openEdit = (subject) => {
    setDialogMode("edit");
    setFormData(subject);
    setError(null);
    setSelectedFile(null); // Reset file
  };

  const openAdd = () => {
    setDialogMode("add");
    setFormData({ name: "", description: "", iconPath: "" }); // Hapus slug
    setError(null);
    setSelectedFile(null); // Reset file
  };

  const saveAdd = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("desc", formData.description);
    if (selectedFile) {
      data.append("thumbnail", selectedFile);
    }

    try {
      const res = await apiRequest("/subjects", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data,
        isFormData: true,
      });

      if (res.status === "success" && res.data) {
        // Refresh data dari server agar sinkron
        await fetchSubjects();
        setDialogMode(null);
        setError(null); // pastikan error direset jika sukses
      } else {
        setError(res?.message || "Terjadi kesalahan saat menambah mata pelajaran.");
      }
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat menambah mata pelajaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveEdit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("desc", formData.description);
    if (selectedFile) {
      // Hanya kirim thumbnail jika file baru dipilih
      data.append("thumbnail", selectedFile);
    }

    // Ambil slug tanpa tanda '/' di depan
    const apiSlug = formData.slug.startsWith("/")
      ? formData.slug.substring(1)
      : formData.slug;

    try {
      const res = await apiRequest(`/subjects/${apiSlug}`, {
        method: "PUT",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data,
        isFormData: true,
      });

      if (res.status === "success" && res.data) {
        // Refresh data dari server agar sinkron
        await fetchSubjects();
        setDialogMode(null);
      } else {
        console.error("Failed to edit subject:", res.message);
        // Tampilkan error ke user
      }
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat menyimpan mata pelajaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSubject = async () => {
    if (!deleteId) return;

    const subjectToDelete = subjects.find((s) => s.id === deleteId);
    if (!subjectToDelete) return;

    // Hilangkan '/' dari slug agar sesuai dengan endpoint API
    const apiSlug = subjectToDelete.slug.startsWith("/")
      ? subjectToDelete.slug.slice(1)
      : subjectToDelete.slug;

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const res = await apiRequest(`/subjects/${apiSlug}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === "success") {
        // Refresh list data agar sinkron dengan database
        await fetchSubjects();
        setDeleteId(null);
      } else {
        console.error("Failed to delete subject:", res.message);
        alert(
          "Gagal menghapus mata pelajaran: " + (res.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Failed to delete subject:", err);
      alert("Terjadi kesalahan saat menghapus data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <SkeletonAdmin />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold text-left mb-5">Mata Pelajaran</h1>
        <div className="flex flex-col lg:flex-row gap-y-2 lg:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-full lg:w-[300px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
              <Input
                placeholder="Cari mata pelajaran..."
                className="border border-b-4 border-r-4 h-full pl-10 w-full"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={openAdd}
            className="gap-2 cursor-pointer"
            variant={"primary"}
          >
            <Plus size={20} /> Mata Pelajaran
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-left mb-1">
        Daftar Mata Pelajaran
      </h3>
      <p className="text-gray-600 text-sm mb-5">
        Berikut adalah daftar seluruh mata pelajaran yang tersedia beserta deskripsi dan slug-nya.
      </p>

      <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto ">
        <Table className="min-w-[850px] px-4 lg:px-6">
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-bold">Nama</TableHead>
              <TableHead className="font-bold">Deskripsi</TableHead>
              <TableHead className="font-bold">Slug</TableHead>
              <TableHead className="text-center font-bold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.length ? filteredSubjects.map((s) => (
              <TableRow key={s.id} className="hover:bg-gray-50">
                <TableCell className="font-semibold flex items-center gap-2">
                  {s.iconPath && (
                    <Avatar>
                      <AvatarImage src={s.iconPath} alt={s.name} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  )}
                  {s.name}
                </TableCell>
                <TableCell className="max-w-[250px] truncate text-sm">
                  {s.description}
                </TableCell>
                <TableCell>
                  <span className="inline-block rounded px-2 py-1 text-xs font-mono bg-blue-100 text-blue-800">
                    {s.slug}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
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
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-12">
                  Tidak ada mata pelajaran ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {dialogMode && (
        <SubjectFormDialog
          open={!!dialogMode}
          onOpenChange={() => setDialogMode(null)}
          mode={dialogMode}
          formData={formData}
          onChange={(f, v) => setFormData({ ...formData, [f]: v })}
          onFileChange={setSelectedFile} // Kirim file biner ke state
          onSubmit={dialogMode === "edit" ? saveEdit : saveAdd}
          isSubmitting={isSubmitting} // Kirim state submitting
          error={error}
        />
      )}

      {deleteId && (
        <ConfirmDeleteDialog
          open={!!deleteId}
          onOpenChange={() => setDeleteId(null)}
          onConfirm={deleteSubject}
          isSubmitting={isSubmitting} // Kirim state submitting
        />
      )}
    </div>
  );
};

export default SubjectTable;
