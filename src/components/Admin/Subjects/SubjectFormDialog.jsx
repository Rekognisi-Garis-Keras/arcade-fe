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
  onSubmit,
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

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Nama</Label>
          <Input
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Deskripsi</Label>
          <Input
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => onChange("slug", e.target.value)}
          />
        </div>
        <FileUploadInput
          label="Icon"
          value={formData.iconPath}
          onChange={(v) => onChange("iconPath", v)}
        />
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          className={"cursor-pointer"}
          onClick={() => onOpenChange(false)}
        >
          Batal
        </Button>
        <Button
          onClick={onSubmit}
          variant={mode === "edit" ? "editProfile" : "primary"}
          className={"cursor-pointer"}
        >
          {mode === "edit" ? "Simpan" : "Tambahkan"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SubjectFormDialog;
