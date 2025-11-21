import React from "react";
import { IFile } from "./FileUpload";
import UploadedFileItem from "./UploadedFileItem";

interface Props {
  files: IFile[];
}

const UploadedFileList: React.FC<Props> = ({ files }) => {
  if (files.length === 0) {
    return <p className="text-gray-500 mt-4">No files uploaded yet</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {files.map((file, index) => (
        <UploadedFileItem key={index} file={file} />
      ))}
    </div>
  );
};

export default UploadedFileList;
