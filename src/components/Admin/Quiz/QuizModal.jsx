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
import { toast } from "sonner";
import { getTopics } from "@/services/topicService";

const QuizModal = ({ open, onClose, onSuccess, initialData, subSlug, topSlug }) => {
  const isEdit = !!initialData;

  const [topics, setTopics] = useState([]);

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

  // ====== FETCH TOPICS ======
  useEffect(() => {
    if (open) {
      getTopics().then(res => {
        if (res.status === "success") setTopics(res.data);
      });
    }
  }, [open]);

  // ======= ISI FORM VALUE JIKA EDIT ====== 
  useEffect(() => {
    if (initialData) setForm(initialData);
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
    setIsLoading(true);

    try {
      const selectedTopic = topics.find(t => t.id === Number(form.topic_id));
      if (!selectedTopic) throw new Error("Pilih topik terlebih dahulu");

      // get slug
      const subSlug = selectedTopic.subject?.slug;
      const topSlug = selectedTopic.slug;

      if (!subSlug || !topSlug) throw new Error("Slug subject atau topic tidak ditemukan");

      const payload = {
        question: form.question,
        options: form.options,
        correct_answer: form.correct_answer,
        explain: form.explain,
      };

      let res;
      if (isEdit) {
        res = await updateQuiz(subSlug, topSlug, initialData.uuid, payload);
      } else {
        res = await addQuiz(subSlug, topSlug, payload);
      }

      if (res.status === "success") {
        toast.success(`Quiz berhasil ${isEdit ? "diperbarui" : "ditambahkan"}!`);
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Gagal menyimpan quiz!");
      }
    } catch (err) {
      console.error("Error submit:", err);
      toast.error("Terjadi kesalahan server!");
    } finally {
      setIsLoading(false);
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
          {/* ===== Topics ===== */}
          <div className="grid gap-2">
            <Label>Topik</Label>
            <NativeSelect
              id="dropdown-topics"
              className="w-full"
              value={form.topic_id || ""}
              onChange={(e) => handleChange("topic_id", e.target.value)}
            >
              <NativeSelectOption value="">Pilih Topik</NativeSelectOption>
              {Array.isArray(topics) && topics.map((topic) => (
                <NativeSelectOption key={topic.id} value={topic.id}>
                  {topic.title} — {topic.subject?.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {/* Pertanyaan */}
          <div className="space-y-2">
            <Label htmlFor="question">Pertanyaan</Label>
            <Textarea
              id="question"
              placeholder="Masukkan pertanyaan..."
              value={form.question ?? ""}
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
              value={form.explain ?? ""}
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
