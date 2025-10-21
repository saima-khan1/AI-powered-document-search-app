import { create } from "domain";
const url = "http://localhost:3003/upload";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("failed ");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err, "failed to upload");
  }
};
