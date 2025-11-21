import React from "react";
interface Props {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ fileInputRef, onChange }) => {
  return (
    <input
      type="file"
      accept="application/pdf"
      ref={fileInputRef}
      onChange={onChange}
      style={{ display: "none" }}
    />
  );
};

export default FileInput;
