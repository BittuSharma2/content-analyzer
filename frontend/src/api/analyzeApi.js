import { backendURL } from "../utils/config";

export const analyzeText = async (text) => {
  const res = await fetch(`${backendURL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Analysis request failed.");

  const data = await res.json();

  if (!data.result) throw new Error("Analysis result missing.");

  return data;
};
