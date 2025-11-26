import { useState } from "react";

export default function useFileProcessor(backendURL) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  // ===========================
  // Handle File Upload
  // ===========================
  const handleFileSelect = async (file) => {
    if (!file) return;

    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("❌ Only PDF, JPG, PNG files allowed!");
      return;
    }

    setUploadedFile(file);
    setUploadProgress(0);
    setLoading(true);
    setError("");
    setExtractedText("");
    setAnalysis("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${backendURL}/upload`, {
        method: "POST",
        body: formData,
        signal: createUploadProgressSignal((percent) => {
          setUploadProgress(percent);
        }),
      });

      if (!res.ok) throw new Error("Upload failed!");

      const data = await res.json();
      if (!data.text) throw new Error("No text extracted.");

      setExtractedText(data.text);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Upload Progress Helper
  const createUploadProgressSignal = (onProgress) => {
    const controller = new AbortController();
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    return controller.signal;
  };

  // ===========================
  // Analyze Extracted Text
  // ===========================
  const handleAnalyze = async () => {
    if (!extractedText) {
      setError("No text available to analyze.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${backendURL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!res.ok) throw new Error("Analysis failed!");

      const data = await res.json();
      if (!data.result) throw new Error("No analysis found.");

      setAnalysis(data.result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    uploadProgress,
    uploadedFile,
    extractedText,
    analysis,
    error,
    handleFileSelect,
    handleAnalyze,
  };
}
