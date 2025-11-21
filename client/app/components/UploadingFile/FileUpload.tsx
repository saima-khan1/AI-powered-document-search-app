"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline, IoDocumentTextOutline } from "react-icons/io5";

import { uploadFile } from "../../services/fetchapi";
import UploadButton from "./UploadButton";
import { on } from "events";
import FileInput from "./FileInput";
import UploadedFileList from "./UploadedFileList";

export interface IFile {
  name: string;
  uploadedAt: string;
}

const FileUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<IFile[]>([]);

  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setUploadedFile(JSON.parse(savedFiles));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFile));
  }, [uploadedFile]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
    console.log(handleFileUpload, "click");
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    console.log("Selected file:", file);

    try {
      setUploading(true);
      const result = await uploadFile(file);

      const newFile: IFile = {
        name: result.fileName,
        uploadedAt: new Date().toLocaleString(),
      };

      setUploadedFile((prev) => [...prev, newFile]);
      console.log(result, "result");
    } catch (err) {
      console.error("upload failed", err);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex flex-col h-full w-full max-w-7xl bg-gray-50 p-6 mx-auto">
      <h2 className="font-light text-3xl">Sources</h2>

      <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-xl border bg-white shadow">
        <UploadButton onClick={handleFileUpload} />

        <FileInput fileInputRef={fileInputRef} onChange={handleFileChange} />

        {uploading && <p className="text-yellow-400 text-lg">Uploading...</p>}

        <UploadedFileList files={uploadedFile} />
      </div>
    </div>
  );
};

export default FileUpload;
