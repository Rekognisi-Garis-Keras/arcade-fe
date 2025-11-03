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
          {mode === "edit" ? "Edit Subject" : "Add New Subject"}
        </DialogTitle>
        <DialogDescription>
          {mode === "edit"
            ? "Make changes to the subject here. Click save when you're done."
            : "Fill in the details for the new subject."}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Description</Label>
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
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {mode === "edit" ? "Save changes" : "Add Subject"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SubjectFormDialog;
