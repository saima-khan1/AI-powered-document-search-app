import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IFile } from "./FileUpload";

interface Props {
  file: IFile;
}

const UploadedFileItem: React.FC<Props> = ({ file }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white shadow rounded-xl">
      <div className="flex items-center gap-3">
        <IoDocumentTextOutline className="text-5xl text-blue-600" />
        <div className="flex flex-col">
          <p className="font-semibold">{file.name}</p>
          <p className="text-sm text-gray-500">{file.uploadedAt}</p>
        </div>
      </div>
      <span className="text-green-500 font-semibold">✅ Uploaded</span>
    </div>
  );
};

export default UploadedFileItem;
