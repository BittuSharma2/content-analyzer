import FileUpload from "../components/FileUpload";
import Loader from "../components/Loader";
import ResultBox from "../components/ResultBox";
import useFileProcessor from "../hooks/useFileProcessor";

export default function Home() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const {
    loading,
    uploadProgress,
    uploadedFile,
    extractedText,
    analysis,
    error,
    handleFileSelect,
    handleAnalyze,
  } = useFileProcessor(backendURL);

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Social Media Content Analyzer
      </h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full 
          hover:bg-blue-700 transition"
        >
          Analyze Text
        </button>
      )}

      {analysis && <ResultBox title="Analysis Result" content={analysis} />}
    </div>
  );
}
