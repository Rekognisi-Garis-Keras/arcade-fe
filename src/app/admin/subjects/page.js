"use client";
import { useState } from "react";
import SubjectTable from "@/components/Admin/Subjects/SubjectTable";
import Editor from "react-simple-wysiwyg";

export default function AdminSubjects() {
  const [html, setHtml] = useState("my <b>HTML</b>");

  function onChange(e) {
    setHtml(e.target.value);
  }
  return (
    <>
      <SubjectTable />
      <Editor value={html} onChange={onChange} />
    </>
  );
}
