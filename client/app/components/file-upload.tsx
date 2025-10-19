"use client";
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const FileUpload: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white text-3xl px-4 py-4 shadow-2xl flex justify-center items-center rounded-lg border-2 border-white">
      <div className="flex items-center justify-center text-3xl space-x-4 py-2 text-center">
        <IoCloudUploadOutline />
        <h1>Upload PDF File</h1>
      </div>
    </div>
  );
};

export default FileUpload;
