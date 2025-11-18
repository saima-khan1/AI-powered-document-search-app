"use client";
import React, { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { uploadFile } from "../services/fetchapi";

const FileUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string>("");

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
      setUploadedFile(result.fileName);
    } catch (err) {
      console.error("upload failed", err);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex flex-col h-full w-full max-w-7xl bg-gray-50  p-6  mx-auto ">
      <h2 className="font-light text-3xl ">Sources</h2>
      <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-xl border bg-white shadow">
        <div className=" flex justify-center items-center bg-gray-900 text-white text-3xl  px-10 py-4  shadow-2xl  rounded-xl border">
          <div
            onClick={handleFileUpload}
            className="flex items-center justify-center  space-x-4   text-center"
          >
            <IoCloudUploadOutline />
            <h1>Upload PDF File</h1>
          </div>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {uploading && <p className="text-yellow-400 text-lg ">Uploading</p>}
          {fileName && !uploading && <p>{fileName}</p>}
          {uploadedFile && !uploading && (
            <p className="text-green-400 text-lg">
              ✅ Uploaded: {uploadedFile}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
