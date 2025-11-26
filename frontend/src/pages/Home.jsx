import { useState } from "react";
import FileUpload from "../components/FileUpload";
import Loader from "../components/Loader";
import ResultBox from "../components/ResultBox";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");

  const backendURL = "http://localhost:5000"; // CHANGE TO YOUR BACKEND URL

  // Handle file upload
  const handleFileSelect = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch(`${backendURL}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setAnalysis("");
    setExtractedText(data.text);
    setLoading(false);
  };

  const handleAnalyze = async () => {
    setLoading(true);

    const res = await fetch(`${backendURL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: extractedText })
    });

    const data = await res.json();
    setAnalysis(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Social Media Content Analyzer
      </h1>

      <FileUpload onFileSelect={handleFileSelect} />

      {loading && <Loader />}
      {/* <p>Extracted Text</p> */}
      {extractedText && (
        <ResultBox title="Extracted Text" content={extractedText} />
      )}

      {extractedText && (
        <button
          onClick={handleAnalyze}
          className="
            bg-blue-600 text-white px-4 py-2 rounded mt-4 
            hover:bg-blue-700 transition
          "
        >
          Analyze Text
        </button>
      )}

      {/* <p>Analysis Result</p> */}
      {analysis && (
        <ResultBox title="Analysis Result" content={analysis} />
      )}
    </div>
  );
}
