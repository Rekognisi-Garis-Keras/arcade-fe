"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/UI/native-select";
import { Textarea } from "@/components/UI/textarea"; // pastikan kamu punya ini di UI kamu
import { addQuiz, updateQuiz } from "@/services/quizService";

const QuizModal = ({ open, onClose, onSuccess, initialData }) => {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    question: "",
    options: [
      { id: "a", text: "" },
      { id: "b", text: "" },
      { id: "c", text: "" },
      { id: "d", text: "" }
    ],
    correct_answer: "",
    explain: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ======= ISI FORM VALUE JIKA EDIT ====== 
  useEffect(() => {
    if (initialData) setForm(initialData);
    else
      setForm({
        question: "",
        options: [
          { id: "a", text: "" },
          { id: "b", text: "" },
          { id: "c", text: "" },
          { id: "d", text: "" },
        ],
        correct_answer: "",
        explain: "",
      });
  }, [initialData]);

  // ====== HANDLER INPUT CHANGE ======
  // field biasa
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // filed option
  const handleOptionChange = (id, text) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === id ? { ...opt, text } : opt
      ),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateQuiz();
      } else {
        await addQuiz();
      }

      onSuccess();
      onClose();
    } catch (error) {
      alert("Error saving topic");
    }
  }

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Quiz" : "Tambah Quiz Baru"}
          </DialogTitle>
          <DialogDescription>
            Isi semua detail soal dengan lengkap ya ✍️
          </DialogDescription>
        </DialogHeader>

        {/* 🔹 FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Pertanyaan */}
          <div className="space-y-2">
            <Label htmlFor="question">Pertanyaan</Label>
            <Textarea
              id="question"
              placeholder="Masukkan pertanyaan..."
              value={form.question}
              onChange={(e) => handleChange("question", e.target.value)}
              required
            />
          </div>

          {/* Pilihan Jawaban */}
          <div className="space-y-3">
            <Label>Pilihan Jawaban</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {form.options.map((opt) => (
                <div key={opt.id} className="space-y-1">
                  <Label>{opt.id.toUpperCase()}.</Label>
                  <Input
                    placeholder={`Pilihan ${opt.id.toUpperCase()}`}
                    value={opt.text}
                    onChange={(e) =>
                      handleOptionChange(opt.id, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Jawaban Benar */}
          <div className="space-y-2">
            <Label htmlFor="correct_answer">Jawaban Benar</Label>
            <select
              id="correct_answer"
              className="border rounded-md p-2 w-full"
              value={form.correct_answer}
              onChange={(e) => handleChange("correct_answer", e.target.value)}
              required
            >
              <option value="">-- Pilih jawaban benar --</option>
              {form.options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.id.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Penjelasan */}
          <div className="space-y-2">
            <Label htmlFor="explain">Penjelasan (Opsional)</Label>
            <Textarea
              id="explain"
              placeholder="Berikan penjelasan singkat..."
              value={form.explain}
              onChange={(e) => handleChange("explain", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Quiz"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
