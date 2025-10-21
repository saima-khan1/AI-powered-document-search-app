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
      console.error("uplaod failed", err);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className=" flex justify-center items-center bg-gray-900 text-white text-3xl  px-6 py-4  shadow-2xl  rounded-lg border-2 border-white">
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
        <p className="text-green-400 text-lg">✅ Uploaded: {uploadedFile}</p>
      )}
    </div>
  );
};

export default FileUpload;
// "use client";
// import React, { useRef, useState } from "react";
// import { IoCloudUploadOutline } from "react-icons/io5";

// const FileUpload: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [fileName, setFileName] = useState("");
//   const [fileURL, setFileURL] = useState<string | null>(null);

//   const handleFileUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//       const url = URL.createObjectURL(file); // creates a local blob URL for preview
//       setFileURL(url);
//       console.log("Selected file:", file);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center bg-gray-900 text-white text-3xl px-6 py-6 shadow-2xl rounded-lg border-2 border-white space-y-4">
//       <div
//         onClick={handleFileUpload}
//         className="flex items-center justify-center space-x-4 cursor-pointer hover:text-blue-400 transition"
//       >
//         <IoCloudUploadOutline />
//         <h1>Upload PDF File</h1>
//       </div>

//       {/* Hidden input */}
//       <input
//         type="file"
//         accept="application/pdf"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />

//       {fileName && <p className="text-lg text-gray-300">📄 {fileName}</p>}

//       {fileURL && (
//         <div className="mt-4 w-full flex justify-center">
//           <iframe
//             src={fileURL}
//             title="PDF Preview"
//             className="w-[400px] h-[500px] border rounded-lg"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
