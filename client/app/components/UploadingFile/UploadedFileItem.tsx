import React from "react";
import { IoDocumentTextOutline, IoTrashOutline } from "react-icons/io5";
import { IFile } from "./FileUpload";

interface Props {
  file: IFile;
  onDelete: (name: string) => void;
}

const UploadedFileItem: React.FC<Props> = ({ file, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white shadow rounded-xl">
      <div className="flex items-center gap-3 min-w-0">
        <IoDocumentTextOutline className="text-5xl text-blue-600" />

        <div className="flex flex-col min-w-0">
          <p className="font-semibold break-words max-w-[40ch]">{file.name}</p>
          <p className="text-sm text-gray-500 truncate max-w-[250px]">
            {file.uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-green-500 font-semibold whitespace-nowrap">
          ✅ Uploaded
        </span>

        <IoTrashOutline
          size={28}
          className="text-red-500 cursor-pointer hover:text-red-700 transition"
          onClick={() => onDelete(file.name)}
        />
      </div>
    </div>
  );
};

export default UploadedFileItem;
