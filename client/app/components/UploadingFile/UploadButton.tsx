import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface Props {
  onClick: () => void;
}

const UploadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center bg-gray-900 text-white text-3xl px-10 py-4 shadow-2xl rounded-xl border cursor-pointer"
    >
      <div className="flex items-center justify-center space-x-4">
        <IoCloudUploadOutline />
        <h1>Upload PDF File</h1>
      </div>
    </div>
  );
};
export default UploadButton;
