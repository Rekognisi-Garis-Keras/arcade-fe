import React from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Label } from "@/components/UI/label";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="dropdown-subjects">Mata Pelajaran:</Label>
      <NativeSelect id="dropdown-subjects">
        <NativeSelectOption value="">Mata Pelajaran</NativeSelectOption>
        <NativeSelectOption value="math">Matematika</NativeSelectOption>
        <NativeSelectOption value="physics">Fisika</NativeSelectOption>
        <NativeSelectOption value="bio">Biologi</NativeSelectOption>
        <NativeSelectOption value="astronomy">Astronomy</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};

export default page;
