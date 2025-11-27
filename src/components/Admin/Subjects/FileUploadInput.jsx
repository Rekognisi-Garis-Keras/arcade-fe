"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import { Upload, X } from "lucide-react";

const FileUploadInput = ({ value, onChange, label, onFileSelect }) => {
  // Prop 'onFileSelect' ditambahkan
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef(null);

  const handleDrag = (e, isOver) => {
    e.preventDefault();
    setIsDragging(isOver);
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/"))
      return alert("Please upload an image file");

    // Untuk preview base64 (dikirim ke 'onChange')
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);

    // Untuk submission (dikirim ke 'onFileSelect')
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    onChange(""); // Hapus preview base64
    if (fileRef.current) fileRef.current.value = "";
    if (onFileSelect) {
      onFileSelect(null); // Hapus file biner di parent
    }
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {value ? (
          <div className="relative p-4 flex items-center gap-3">
            <img
              src={value}
              alt="Preview"
              className="w-16 h-16 object-cover rounded border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                Ikon berhasil diunggah
              </p>
              <p className="text-xs text-gray-500">
                Klik untuk mengubah atau seret file baru
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm font-medium text-gray-900">
              Seret dan jatuhkan ikon di sini, atau klik untuk memilih
            </p>
            <p className="text-xs text-gray-500 mt-1">
              SVG, PNG, JPG, atau GIF (maks. 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadInput;