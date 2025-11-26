import { useState } from "react";
import FileUpload from "../components/FileUpload";
import Loader from "../components/Loader";
import ResultBox from "../components/ResultBox";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  const backendURL = "http://localhost:5000"; // CHANGE TO YOUR BACKEND URL

  // Handle file upload
  const handleFileSelect = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setAnalysis("");
    setExtractedText("");

    try {
      const res = await fetch(`${backendURL}/upload`, {
        method: "POST",
        body: formData,
      });

      // if backend returns non 200
      if (!res.ok) {
        throw new Error("Failed to upload file. Server error.");
      }

      const data = await res.json();

      if (!data.text) {
        throw new Error("No text extracted from file.");
      }

      setExtractedText(data.text);
    } catch (err) {
      setError(err.message || "Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

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

      if (!res.ok) {
        throw new Error("Analysis request failed. Please try again.");
      }

      const data = await res.json();

      if (!data.result) {
        throw new Error("Analysis result not found.");
      }

      setAnalysis(data.result);
    } catch (err) {
      setError(err.message || "Error occurred while analyzing text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Social Media Content Analyzer
      </h1>

      {/* Error Box */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-300">
          ⚠️ {error}
        </div>
      )}

      <FileUpload onFileSelect={handleFileSelect} />

      {loading && <Loader />}

      {extractedText && (
        <ResultBox title="Extracted Text" content={extractedText} />
      )}

      {extractedText && (
        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 
          hover:bg-blue-700 transition"
        >
          Analyze Text
        </button>
      )}

      {analysis && (
        <ResultBox title="Analysis Result" content={analysis} />
      )}
    </div>
  );
}
