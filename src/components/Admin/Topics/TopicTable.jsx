"use client";

import { Button } from "@/components/UI/button";
import { SquarePen, Trash, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import TopicFormDialog from "./TopicFormDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { Input } from "../../UI/input";
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
import { addTopic, deleteTopic, getTopics, updateTopic } from "@/services/topicService";
import { getSubjects } from "@/services/subjectService";

const TopicTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubSlug, setCurrentSubSlug] = useState(null);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [dialogMode, setDialogMode] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    desc: "",
    content: "",
    scale_model: "",
    icon: null,
    model_url: null,
    marker_img_url: null,
  });
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch topics and subjects
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const [topicResponse, subjectResponse] = await Promise.all([
        getTopics(),
        getSubjects(),
      ]);

      if (topicResponse.status === "success" && Array.isArray(topicResponse.data)) {
        const mapped = topicResponse.data.map((topic) => ({
          id: topic.id,
          title: topic.title,
          slug: topic.slug,
          desc: topic.desc,
          model_url: topic.model_url,
          marker_img_url: topic.marker_img_url,
          scale_model: topic.scale_model,
          content: topic.content,
          subject: topic.subject,
        }));
        setTopics(mapped);
        setFilteredTopics(mapped);
      } else {
        setTopics([]);
        setFilteredTopics([]);
      }

      if (subjectResponse.status === "success" && Array.isArray(subjectResponse.data)) {
        setSubjects(subjectResponse.data);
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setTopics([]);
      setFilteredTopics([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Filter topics based on search input
  useEffect(() => {
    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTopics(filtered);
  }, [searchInput, topics]);

  // Reset form data
  const resetFormData = () => {
    setFormData({
      subject: "",
      title: "",
      desc: "",
      icon: null,
      scale_model: "",
      model_url: null,
      marker_img_url: null,
    });
  };

  // Open add dialog
  const openAdd = () => {
    resetFormData();
    setDialogMode("add");
  };

  // Open edit dialog
  const openEdit = (topic) => {
    setFormData({
      id: topic.id,
      subject: topic.subject?.id || "",
      title: topic.title,
      slug: topic.slug,
      desc: topic.desc,
      content: topic.content,
      scale_model: topic.scale_model || "",
      icon: null,
      model_url: topic.model_url,
      marker_img_url: topic.marker_img_url,
    });
    setDialogMode("edit");
  };

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file changes
  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // Save new topic
  const saveAdd = async () => {
    setIsSubmitting(true);

    try {
      const selectedSubject = subjects.find(
        (s) => String(s.id) === String(formData.subject)
      );

      if (!selectedSubject || !selectedSubject.slug) {
        alert("Mata pelajaran tidak valid");
        setIsSubmitting(false);
        return;
      }

      // Validation for required files
      if (!formData.icon) {
        alert("Icon wajib diunggah");
        setIsSubmitting(false);
        return;
      }

      // Validation for subject
      if (!formData.subject) {
        alert("Pilih mata pelajaran terlebih dahulu");
        setIsSubmitting(false);
        return;
      }

      // Compose FormData per backend requirements
      const data = new FormData();
      data.append("title", formData.name || "");
      data.append("desc", formData.desc || "");
      data.append("content", formData.content || "");
      if (formData.scale) {
        data.append("scale_model", formData.scale);
      }

      data.append("icon", formData.icon);
      data.append("model_url", formData.model_url);
      data.append("marker_img_url", formData.marker_img_url);

      // Send to backend according to backend's create implementation
      const res = await addTopic(selectedSubject.slug, data);

      if (res.status === "success" || res.status === 201) {
        await fetchTopics();
        setDialogMode(null);
        resetFormData();
        alert("Topik berhasil ditambahkan!");
      } else {
        const message = res.message || "Unknown error";
        console.error("Failed to add topic:", message);
        alert("Gagal menambahkan topik: " + message);
      }
    } catch (error) {
      console.error("Failed to add topic:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save edited topic
  const handleUpdateTopic = async (subSlug) => {
    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("title", formData.name);
      data.append("desc", formData.desc);
      data.append("content", formData.content);
      data.append("scale_model", formData.scale);
      data.append("model_url", formData.model_url);
      data.append("marker_img_url", formData.marker_img_url);

      if (formData.icon) data.append("icon", formData.icon);

      if (!formData.slug) throw new Error("Slug topik tidak ditemukan.");

      const res = await updateTopic(subSlug, formData.slug, data);

      await fetchTopics();
      alert("Topik berhasil diperbarui!");

      setDialogMode(null);
      resetFormData();
    } catch (err) {
      console.error("Failed to edit topic:", err);
      alert("Terjadi kesalahan saat memperbarui topik", (res.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete topic
  const handleDeleteTopic = async (subSlug) => {
    if (!deleteId) return;
  
    setIsSubmitting(true);
    try {
      const res = await deleteTopic(subSlug, deleteId);
      await fetchTopics();
      alert("Topik berhasil dihapus!");
    } catch (err) {
      console.error("Failed to delete topic:", err);
      alert("Terjadi kesalahan saat menghapus topik");
    } finally {
      setIsSubmitting(false);
      setDeleteId(null);
    }
  };

  if (loading) return <SkeletonAdmin />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold text-left mb-5">Topik Materi</h1>
        <div className="flex flex-col lg:flex-row gap-y-2 lg:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Cari topik..."
              className="border border-b-4 border-r-4 h-full lg:w-[300px]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="primary" className="cursor-pointer">
              <Search />
            </Button>
          </div>
          <Button
            onClick={openAdd}
            className="gap-2 cursor-pointer"
            variant="primary"
          >
            <Plus size={20} /> Tambah Topik Baru
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-left mb-5">
        List Topik Materi ({filteredTopics.length})
      </h3>

      {/* Table Section */}
      <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <Table className="min-w-[850px] px-4 lg:px-6">
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-bold">Mata Pelajaran</TableHead>
              <TableHead className="font-bold">Nama Topik</TableHead>
              <TableHead className="font-bold">Deskripsi</TableHead>
              <TableHead className="font-bold">Model 3D</TableHead>
              <TableHead className="font-bold">Scale</TableHead>
              <TableHead className="font-bold">Marker</TableHead>
              <TableHead className="text-center font-bold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTopics.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  {searchInput
                    ? "Tidak ada topik yang sesuai dengan pencarian"
                    : "Belum ada topik. Tambahkan topik baru untuk memulai."}
                </TableCell>
              </TableRow>
            ) : (
              filteredTopics.map((topic) => (
                <TableRow key={topic.id} className="hover:bg-gray-50">
                  <TableCell className="font-semibold">
                    {topic.subject.name}
                  </TableCell>
                  <TableCell className="font-semibold">{topic.title}</TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {topic.desc}
                  </TableCell>
                  <TableCell>
                    {topic.model_url ? (
                      <Link href={topic.model_url} target="_blank">
                        <Button
                          variant="primary"
                          className="normal-case cursor-pointer"
                          size="sm"
                        >
                          Lihat Model
                        </Button>
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm">Tidak ada</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {topic.scale_model ? `${topic.scale_model}x` : "-"}
                  </TableCell>
                  <TableCell>
                    {topic.marker_img_url ? (
                      <Link href={topic.model_url} target="_blank">
                        <Button
                          variant="primary"
                          className="normal-case cursor-pointer"
                          size="sm"
                        >
                          Lihat Marker
                        </Button>
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm">Tidak ada</span>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="editProfile"
                      onClick={() => openEdit(topic)}
                      className="h-8 w-8 p-0 cursor-pointer"
                      title="Edit topik"
                    >
                      <SquarePen size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="delete"
                      onClick={() => {
                        setCurrentSubSlug(topic.subject?.slug || null);
                        setDeleteId(topic.slug);
                      }}
                      className="h-8 w-8 p-0 cursor-pointer"
                      title="Hapus topik"
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {dialogMode && (
        <TopicFormDialog
          open={!!dialogMode}
          onOpenChange={() => {
            setDialogMode(null);
            resetFormData();
          }}
          mode={dialogMode}
          formData={formData}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={dialogMode === "edit" ? handleUpdateTopic : saveAdd}
          isSubmitting={isSubmitting}
          subjects={subjects}
        />
      )}

      {deleteId && (
        <ConfirmDeleteDialog
          open={!!deleteId}
          onOpenChange={() => setDeleteId(null)}
          onConfirm={() => handleDeleteTopic(currentSubSlug)}
          isSubmitting={isSubmitting}
          title="Hapus Topik"
          description="Apakah Anda yakin ingin menghapus topik ini? Tindakan ini tidak dapat dibatalkan."
        />
      )}
    </div>
  );
};

export default TopicTable;