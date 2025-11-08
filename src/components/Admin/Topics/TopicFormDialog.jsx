"use client";
import { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import { CloudUpload } from "lucide-react";
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
import FileUploadInput from "./FileUploadInput";

const TopicFormDialog = ({
  open,
  onOpenChange,
  mode,
  formData,
  onChange,
  onFileChange,
  onSubmit,
  isSubmitting,
}) => {
  // 🧠 Sync state editor dengan formData.description
  const [html, setHtml] = useState(formData.description || "");

  useEffect(() => {
    setHtml(formData.description || "");
  }, [formData.description]);

  const handleEditorChange = (e) => {
    const value = e.target.value;
    setHtml(value);
    onChange("description", value); // sync ke parent form
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? "Edit Topik Pelajaran"
              : "Tambah Topik Pelajaran Baru"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Ubah topik pelajaran di sini. Klik simpan setelah selesai."
              : "Isi detail untuk topik pelajaran baru."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* 🧩 Mata Pelajaran */}
          <div className="grid gap-2">
            <Label>Mata Pelajaran</Label>
            <NativeSelect
              id="dropdown-subjects"
              className="w-full"
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

          {/* 🧩 Judul */}
          <div className="grid gap-2">
            <Label>Judul Topik</Label>
            <Input
              value={formData.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              disabled={isSubmitting}
              placeholder="Pembelahan sel"
            />
          </div>

          {/* 🧩 Konten */}
          <div className="grid gap-2">
            <Label>Konten</Label>
            <Editor value={html} onChange={handleEditorChange} />
          </div>

          {/* 🧩 Icon Upload */}
          <FileUploadInput
            label="Icon"
            value={formData.iconPath}
            onChange={(v) => onChange("iconPath", v)}
            onFileSelect={onFileChange}
          />

          {/* 🧩 Model 3D */}
          <div className="grid gap-2">
            <Label htmlFor="picture">
              <CloudUpload size={20} strokeWidth={2} /> Model 3D
            </Label>
            <Input id="picture" type="file" />
          </div>

          {/* 🧩 Scale */}
          <div className="grid gap-2">
            <Label>Scale Model</Label>
            <Input
              value={formData.scale || ""}
              onChange={(e) => onChange("scale", e.target.value)}
              disabled={isSubmitting}
              placeholder="Contoh: 1 atau 0.5"
            />
          </div>

          {/* 🧩 Marker */}
          <div className="grid gap-2">
            <Label htmlFor="picture">
              <CloudUpload size={20} strokeWidth={2} />
              Marker
            </Label>
            <Input id="picture" type="file" />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            onClick={onSubmit}
            variant={mode === "edit" ? "editProfile" : "primary"}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Menyimpan..."
              : mode === "edit"
              ? "Simpan"
              : "Tambahkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TopicFormDialog;
