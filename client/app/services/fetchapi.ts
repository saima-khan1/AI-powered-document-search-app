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

export const sendMessage = async (message: string) => {
  try {
    const response = await fetch("http://localhost:3003/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error sending message:", err);
    throw err;
  }
};
