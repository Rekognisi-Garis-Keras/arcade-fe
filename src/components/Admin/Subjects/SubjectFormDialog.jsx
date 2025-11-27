"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import FileUploadInput from "./FileUploadInput";

const SubjectFormDialog = ({
  open,
  onOpenChange,
  mode,
  formData,
  onChange,
  onFileChange, // Prop baru untuk file biner
  onSubmit,
  isSubmitting, // Prop baru untuk loading
  error,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {mode === "edit"
            ? "Edit Mata Pelajaran"
            : "Tambah Mata Pelajaran Baru"}
        </DialogTitle>
        <DialogDescription>
          {mode === "edit"
            ? "Ubah mata pelajaran di sini. Klik simpan setelah selesai."
            : "Isi detail untuk mata pelajaran baru."}
        </DialogDescription>
      </DialogHeader>

      {error && (
        <div className="mb-2 p-3 rounded bg-red-100 text-red-700 text-sm border border-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Nama</Label>
          <Input
            value={formData.name}
            placeholder="Nama mata pelajaran"
            onChange={(e) => onChange("name", e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="grid gap-2">
          <Label>Deskripsi</Label>
          <textarea
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            disabled={isSubmitting}
            className="border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={4}
            placeholder="Deskripsi mata pelajaran"
          />
        </div>
        {/* Input Slug dihapus sesuai permintaan */}
        <FileUploadInput
          label="Ikon"
          value={formData.iconPath} // Untuk preview (base64)
          onChange={(v) => onChange("iconPath", v)} // Untuk update preview (base64)
          onFileSelect={onFileChange} // Untuk update file biner
        />
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          className={"cursor-pointer"}
          onClick={() => onOpenChange(false)}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button
          onClick={onSubmit}
          variant={mode === "edit" ? "editProfile" : "primary"}
          className={"cursor-pointer"}
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

export default SubjectFormDialog;