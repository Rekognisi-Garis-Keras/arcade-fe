"use client";

import { Button } from "@/components/UI/button";
import { SquarePen, Trash, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import TopicFormDialog from "./TopicFormDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { Input } from "../../UI/input";
import { apiRequest } from "@/utils/api";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import SkeletonAdmin from "@/app/admin/skeleton";

const TopicTable = () => {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [dialogMode, setDialogMode] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    slug: "",
    iconPath: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await apiRequest("/topics", {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === "success" && Array.isArray(res.data)) {
        const mapped = res.data.map((s) => ({
          id: s.id,
          title: s.title,
          slug: `/${s.slug}`,
          description: s.desc || s.description || "",
          model_url: s.model_url,
          marker_img_url: s.marker_img_url,
          scale_model: s.scale_model,
          content: s.content,
          subject: s.subject,
        }));
        setTopics(mapped);
        setFilteredTopics(mapped);
      } else {
        setTopics([]);
        setFilteredTopics([]);
      }
    } catch (err) {
      console.error("Failed to fetch topics:", err);
      setTopics([]);
      setFilteredTopics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // filter berdasarkan search input
  useEffect(() => {
    const filtered = topics.filter((s) =>
      s.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTopics(filtered);
  }, [searchInput, topics]);

  const openEdit = (subject) => {
    setDialogMode("edit");
    setFormData(subject);
    setSelectedFile(null); // Reset file
  };

  const openAdd = () => {
    setDialogMode("add");
    setFormData({ name: "", description: "", iconPath: "" }); // Hapus slug
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
      } else {
        console.error("Failed to add subject:", res.message);
        // Tampilkan error ke user
      }
    } catch (err) {
      console.error("Failed to add subject:", err);
      // Tampilkan error ke user
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
      console.error("Failed to edit subject:", err);
      // Tampilkan error ke user
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSubject = async () => {
    if (!deleteId) return;

    const subjectToDelete = topics.find((s) => s.id === deleteId);
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
        <h1 className="text-3xl font-bold text-left mb-5">Topik Materi</h1>
        <div className="flex flex-col lg:flex-row gap-y-2 lg:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Cari data..."
              className={"border border-b-4 border-r-4 h-full lg:w-[300px] "}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="primary" className="cursor-pointer">
              <Search />
            </Button>
          </div>
          <Button
            onClick={openAdd}
            className="gap-2 cursor-pointer"
            variant={"primary"}
          >
            <Plus size={20} /> Tambah Topik Baru
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-left mb-5">
        List Topik Materi
      </h3>

      <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto ">
        <Table className="min-w-[850px] px-4 lg:px-6">
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-bold">Mata Pelajaran</TableHead>
              <TableHead className="font-bold">Nama</TableHead>
              <TableHead className="font-bold">Konten Topik</TableHead>
              <TableHead className="font-bold">Model 3D</TableHead>
              <TableHead className="font-bold">Scale Model</TableHead>
              <TableHead className="font-bold">Gambar Marker</TableHead>
              <TableHead className="text-center font-bold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTopics.map((s) => (
              <TableRow key={s.id} className="hover:bg-gray-50">
                <TableCell className="font-semibold">{s.subject.name}</TableCell>
                <TableCell className="font-semibold">{s.title}</TableCell>
                <TableCell className={"max-w-[250px] truncate"}>
                  {s.description}
                </TableCell>
                <TableCell>
                  <Link
                    href={s.model_url}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <Button
                      variant={"primary"}
                      className={"normal-case cursor-pointer"}
                      size={"sm"}
                    >
                      Model 3D
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{`${s.scale_model}x`}</TableCell>
                <TableCell>
                  <Link
                    href={s.marker_img_url}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <Button
                      variant={"primary"}
                      className={"normal-case cursor-pointer"}
                      size={"sm"}
                    >
                      Marker Image
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className="flex justify-center gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {dialogMode && (
        <TopicFormDialog
          open={!!dialogMode}
          onOpenChange={() => setDialogMode(null)}
          mode={dialogMode}
          formData={formData}
          onChange={(f, v) => setFormData({ ...formData, [f]: v })}
          onFileChange={setSelectedFile} // Kirim file biner ke state
          onSubmit={dialogMode === "edit" ? saveEdit : saveAdd}
          isSubmitting={isSubmitting} // Kirim state submitting
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

export default TopicTable;
