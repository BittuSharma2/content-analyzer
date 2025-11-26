import { backendURL } from "../utils/config";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${backendURL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file. Server error.");
  }

  const data = await res.json();

  if (!data.text) throw new Error("No text extracted from file.");

  return data;
};
