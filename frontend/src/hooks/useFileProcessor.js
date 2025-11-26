import { useState } from "react";

export default function useFileProcessor(backendURL) {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  // -----------------------------
  // Upload and Extract Text
  // -----------------------------
  const uploadFile = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setError("");
    setLoading(true);
    setExtractedText("");
    setAnalysis("");

    try {
      const res = await fetch(`${backendURL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload file.");

      const data = await res.json();
      if (!data.text) throw new Error("No text extracted from file.");

      setExtractedText(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Analyze Extracted Text
  // -----------------------------
  const analyzeText = async () => {
    if (!extractedText) {
      setError("No text available to analyze.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${backendURL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!res.ok) throw new Error("Analysis request failed.");

      const data = await res.json();
      if (!data.result) throw new Error("Analysis result missing.");

      setAnalysis(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    extractedText,
    analysis,
    error,
    uploadFile,
    analyzeText,
  };
}
