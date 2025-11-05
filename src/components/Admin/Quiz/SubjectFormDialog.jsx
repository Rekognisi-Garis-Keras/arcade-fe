"use client";
import { useState } from "react";
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

const QuizFormDialog = ({
  open,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
  isSubmitting,
}) => {
  // 🧠 buat struktur awal data untuk 5 soal
  const [questions, setQuestions] = useState(
    formData.questions ||
      Array.from({ length: 5 }, () => ({
        question: "",
        options: { A: "", B: "", C: "", D: "" },
        correct: "",
        explanation: "",
      }))
  );

  // 🧩 handle perubahan input per soal
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (["A", "B", "C", "D"].includes(field)) {
      newQuestions[index].options[field] = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
    onChange("questions", newQuestions);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Soal Kuis Baru</DialogTitle>
          <DialogDescription>
            Isi semua detail soal dengan lengkap ya ✍️
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* 🧩 Mata Pelajaran */}
          <div className="grid gap-2">
            <Label>Mata Pelajaran</Label>
            <NativeSelect
              value={formData.subject || ""}
              onChange={(e) => onChange("subject", e.target.value)}
              disabled={isSubmitting}
            >
              <NativeSelectOption value="">
                Pilih Mata Pelajaran
              </NativeSelectOption>
              <NativeSelectOption value="math">Matematika</NativeSelectOption>
              <NativeSelectOption value="physics">Fisika</NativeSelectOption>
              <NativeSelectOption value="bio">Biologi</NativeSelectOption>
              <NativeSelectOption value="astronomy">
                Astronomi
              </NativeSelectOption>
            </NativeSelect>
          </div>

          {/* 🧩 Topik */}
          <div className="grid gap-2">
            <Label>Topik</Label>
            <NativeSelect
              value={formData.topic || ""}
              onChange={(e) => onChange("topic", e.target.value)}
              disabled={isSubmitting}
            >
              <NativeSelectOption value="">Pilih Topik</NativeSelectOption>
              <NativeSelectOption value="topic1">Topik 1</NativeSelectOption>
              <NativeSelectOption value="topic2">Topik 2</NativeSelectOption>
              <NativeSelectOption value="topic3">Topik 3</NativeSelectOption>
              <NativeSelectOption value="topic4">Topik 4</NativeSelectOption>
              <NativeSelectOption value="topic5">Topik 5</NativeSelectOption>
            </NativeSelect>
          </div>

          {/* 🧠 Iterasi 5 Soal */}
          {questions.map((q, index) => (
            <div key={index} className="border rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-lg">Nomor {index + 1}</h3>

              {/* 🧩 Pertanyaan */}
              <div className="grid gap-2">
                <Label>Pertanyaan</Label>
                <Input
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  placeholder="Contoh: Apa itu pembelahan mitosis?"
                />
              </div>

              {/* 🧩 Opsi A-D */}
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt} className="grid gap-2">
                  <Label>Opsi {opt}</Label>
                  <Input
                    value={q.options[opt]}
                    onChange={(e) =>
                      handleQuestionChange(index, opt, e.target.value)
                    }
                    placeholder={`Masukkan opsi ${opt}`}
                  />
                </div>
              ))}

              {/* 🧩 Jawaban Benar */}
              <div className="grid gap-2">
                <Label>Jawaban Benar</Label>
                <NativeSelect
                  value={q.correct}
                  onChange={(e) =>
                    handleQuestionChange(index, "correct", e.target.value)
                  }
                >
                  <NativeSelectOption value="">
                    Pilih Jawaban
                  </NativeSelectOption>
                  <NativeSelectOption value="A">A</NativeSelectOption>
                  <NativeSelectOption value="B">B</NativeSelectOption>
                  <NativeSelectOption value="C">C</NativeSelectOption>
                  <NativeSelectOption value="D">D</NativeSelectOption>
                </NativeSelect>
              </div>

              {/* 🧩 Penjelasan Jawaban */}
              <div className="grid gap-2">
                <Label>Penjelasan Jawaban</Label>
                <Textarea
                  value={q.explanation}
                  onChange={(e) =>
                    handleQuestionChange(index, "explanation", e.target.value)
                  }
                  placeholder="Jelaskan kenapa jawaban ini benar..."
                />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Semua Soal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizFormDialog;
