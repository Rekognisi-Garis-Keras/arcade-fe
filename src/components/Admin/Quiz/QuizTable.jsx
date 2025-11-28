"use client";

import { Button } from "@/components/UI/button";
import { SquarePen, Trash, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../../UI/input";
import { deleteQuiz } from "@/services/quizService";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import SkeletonAdmin from "@/app/admin/skeleton";
import { getAllQuizzes } from "@/services/quizService";
import QuizModal from "./QuizModal";

const QuizTable = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  // ====== FETCH QUIZZES ======
  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const res = await getAllQuizzes();
      setQuizzes(res.data);
      setFilteredQuizzes(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  
  // Filter quizzes based on search input
  useEffect(() => {
    if (!searchInput) {
      setFilteredQuizzes(quizzes);
      return;
    }

    const filtered = Array.isArray(quizzes)
      ? quizzes
          .map(qg => ({
            ...qg,
            quizzes: Array.isArray(qg.quizzes)
              ? qg.quizzes.filter(quiz =>
                  quiz.question.toLowerCase().includes(searchInput.toLowerCase())
                )
              : [],
          }))
          .filter(qg => qg.quizzes.length > 0)
      : [];

    setFilteredQuizzes(filtered);
  }, [searchInput, quizzes]);

  // ====== HANDLE MODAL ======
  const openCreateModal = () => {
    setSelected(null);
    setOpen(true);
  };
  
  const openEditQuiz = (quiz) => {
    setSelected(quiz);
    setOpen(true);
  };

  const handleSuccess = () => {
    fetchQuizzes();
    setOpen(false);
  };

  // ======= HANDLE DELETE ======
  const handleDeleteQuiz = async (quiz) => {
    if (!quiz || !quiz.topic) return toast.error("Quiz atau topik tidak valid!");

    const subSlug = quiz.topic.subject?.slug;
    const topSlug = quiz.topic.slug;
    const uuid = quiz.uuid;

    console.log({subSlug, topSlug, uuid});

    if (!subSlug || !topSlug || !uuid) {
      return toast.error("Slug subject, topic, atau ID quiz tidak ditemukan!");
    }

    if (window.confirm("Yakin ingin menghapus quiz ini?")) {
      try {
        await deleteQuiz(subSlug, topSlug, uuid);
        toast.success("Quiz berhasil dihapus!");
        fetchQuizzes();
      } catch (err) {
        console.error("Delete quiz error:", err);
        toast.error("Gagal menghapus quiz!");
      }
    }
  };

  if (isLoading) return <SkeletonAdmin />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold text-left mb-5">Kuis</h1>
        <div className="flex flex-col lg:flex-row gap-y-2 lg:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-full lg:w-[300px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
              <Input
                placeholder="Cari kuis..."
                className="border border-b-4 border-r-4 h-full pl-10 py-3 w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="gap-2 cursor-pointer"
            variant={"primary"}
            onClick={openCreateModal}
          >
            <Plus size={20} /> Quiz
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-left mb-1">
        Daftar Kuis
      </h3>
      <p className="text-gray-600 text-sm mb-5">
        Berikut adalah daftar seluruh kuis yang tersedia beserta detailnya.
      </p>

      <div className="space-y-6">
        {filteredQuizzes.length ? filteredQuizzes.map((quizGroup, i) => (
          <div key={i} className="space-y-3">
            {/* Topic Header */}  
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold shadow-sm border border-blue-200">
                <span className="mr-1 font-semibold">Topic:</span>
                <span className="font-medium">{quizGroup.topic?.title}</span>
              </span>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
              <Table className="min-w-[850px]">
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead className="font-bold">Soal</TableHead>
                    <TableHead className="font-bold">Pilihan</TableHead>
                    <TableHead className="font-bold">Penjelasan</TableHead>
                    <TableHead className="font-bold w-24">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizGroup.quizzes.map((quiz, j) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="align-top">{quiz.question}</TableCell>
                      <TableCell>
                        <ul className="list-disc pl-4">
                          {quiz.options.map(opt => (
                            <li key={opt.id}>
                              <span className={`font-medium ${opt.id === quiz.correct_answer ? "text-green-600" : ""}`}>
                                {opt.id.toUpperCase()}. {opt.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="align-top">
                        {quiz.explain ? (
                          <span>{quiz.explain}</span>
                        ) : (
                          <span className="italic text-gray-400">Tidak ada penjelasan</span>
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="editProfile"
                            onClick={() => openEditQuiz(quiz)}
                            className="h-8 w-8 p-0 cursor-pointer"
                            title="Edit soal"
                          >
                            <SquarePen size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="delete"
                            onClick={() => handleDeleteQuiz(quiz)}
                            className="h-8 w-8 p-0 cursor-pointer"
                            title="Hapus soal"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-12">
            Tidak ada soal ditemukan.
          </div>
        )}
      </div>

      {/* === MODAL TAMBAH/EDIT === */}
      <QuizModal 
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
        initialData={selected}
      />

      {/* === Confirm Dialog === */}
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

export default QuizTable;
