"use client";

import { Button } from "@/components/UI/button";
import { SquarePen, Trash, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import SubjectFormDialog from "./SubjectFormDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"; // Asumsi Anda punya komponen ini
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
import { getAllQuizzes } from "@/services/quizService";

const QuizTable = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await getAllQuizzes();
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold text-left mb-5">Quiz</h1>
        <div className="flex flex-col lg:flex-row gap-y-2 lg:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Cari data..."
              className={"border border-b-4 border-r-4 h-full lg:w-[300px] "}
              // onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="primary" className="cursor-pointer">
              <Search />
            </Button>
          </div>
          <Button
            // onClick={openAdd}
            className="gap-2 cursor-pointer"
            variant={"primary"}
          >
            <Plus size={20} /> Tambah Topik Baru
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-left mb-5">
        List Quiz Topic
      </h3>

      <div className="space-y-6">
        {quizzes.map((quizGroup, i) => (
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
                            onClick={() => {
                              setDeleteQuizId(quiz.id);
                            }}
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
        ))}
      </div>

      {/* Dialogs */}
      {/* {dialogMode && (
        <SubjectFormDialog
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
      )} */}
    </div>
  );
};

export default QuizTable;
