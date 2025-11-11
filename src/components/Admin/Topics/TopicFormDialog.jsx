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
  subjects
}) => {
  const [html, setHtml] = useState(formData.content || "");

  useEffect(() => {
    setHtml(formData.content || "");
  }, [formData.content]);

  const handleEditorChange = (e) => {
    const value = e.target.value;
    setHtml(value);
    onChange("content", value);
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
          {/* ===== Subjects ===== */}
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
              {Array.isArray(subjects) && subjects.map((subject) => (
                <NativeSelectOption key={subject.id} value={subject.id}>
                  {subject.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {/* ===== Title ===== */}
          <div className="grid gap-2">
            <Label>Judul Topik</Label>
            <Input
              value={formData.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              disabled={isSubmitting}
              placeholder="Pembelahan sel"
            />
          </div>

          {/* ===== Desc ===== */}
          <div className="grid gap-2">
            <Label>Deskripsi</Label>
            <Input
              value={formData.desc || ""}
              onChange={(e) => onChange("desc", e.target.value)}
              disabled={isSubmitting}
              placeholder="Deskripsi singkat topik"
            />
          </div>

          {/* ===== Content ===== */}
          <div className="grid gap-2">
            <Label>Konten</Label>
            <Editor value={html} onChange={handleEditorChange} />
          </div>

          {/* ===== Icon ===== */}
          <FileUploadInput
            label="Icon"
            value={formData.iconPath}
            onChange={(v) => onChange("iconPath", v)}
            onFileSelect={(file) => onFileChange("icon", file)}
          />

          {/* ===== Model 3D ===== */}
          <div className="grid gap-2">
            <Label htmlFor="model-file">
              <CloudUpload size={20} strokeWidth={2} /> Model 3D
            </Label>
            <Input
              id="model-file"
              type="file"
              onChange={(e) => onFileChange("model", e.target.files[0])}
              disabled={isSubmitting}
              // accept=".glb,.gltf,.obj,.fbx"
            />
            {formData.model && (
              <p className="text-sm text-gray-500">{formData.model.name}</p>
            )}
          </div>

          {/* ===== Scale Model ===== */}
          <div className="grid gap-2">
            <Label>Scale Model</Label>
            <Input
              type="number"
              step="0.1"
              value={formData.scale || ""}
              onChange={(e) => onChange("scale", e.target.value)}
              disabled={isSubmitting}
              placeholder="Contoh: 1 atau 0.5"
            />
          </div>

          {/* ===== Marker ===== */}
          <div className="grid gap-2">
            <Label htmlFor="marker-file">
              <CloudUpload size={20} strokeWidth={2} />
              Marker
            </Label>
            <Input
              id="marker-file"
              type="file"
              onChange={(e) => onFileChange("marker", e.target.files[0])}
              disabled={isSubmitting}
              accept="image/*"
            />
            {formData.marker && (
              <p className="text-sm text-gray-500">{formData.marker.name}</p>
            )}
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
