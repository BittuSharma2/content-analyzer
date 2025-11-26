import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ onFileSelect }) {
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [error, setError] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError("");
    setFileType("");
    setFileName("");
    setFileSize(0);
    setUploadProgress(0);
    setIsUploading(false);

    if (rejectedFiles.length > 0) {
      setError("Invalid file. Only images/PDF (max 10MB) allowed.");
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // size check
    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 10MB.");
      return;
    }

    // File details
    setFileName(file.name);
    setFileSize(file.size);

    // Detect file type
    if (file.type.startsWith("image/")) setFileType("image");
    else setFileType("pdf");

    // Pass file to parent with progress callback
    onFileSelect(file, handleUploadProgress);
  }, []);

  const handleUploadProgress = (percent) => {
    setIsUploading(true);
    setUploadProgress(percent);
    if (percent === 100) {
      setTimeout(() => setIsUploading(false), 700);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "application/pdf": [],
      "image/*": [],
    },
  });

  return (
    <div>
      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 cursor-pointer text-center transition 
          ${isDragActive ? "border-blue-600 bg-blue-100" : "border-gray-400 hover:bg-gray-100"}
        `}
      >
        <input {...getInputProps()} />

        {/* If File Selected */}
        {fileName ? (
          <div className="flex flex-col items-center gap-3">

            {/* ICON ONLY (No preview) */}
            {fileType === "image" && (
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M8 11l3 3 5-5" />
              </svg>
            )}

            {fileType === "pdf" && (
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M7 3h8l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 17v-6m0 0l2 2m-2-2l-2 2" />
              </svg>
            )}

            {/* FILE NAME + SIZE */}
            <p className="text-gray-900 font-semibold">{fileName}</p>
            <p className="text-gray-600 text-sm">
              {(fileSize / 1024 / 1024).toFixed(2)} MB
            </p>

            {/* Progress Bar */}
            {isUploading && (
              <>
                <div className="w-full max-w-xs bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-3 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>

                <p className="text-blue-700 font-medium mt-2 animate-pulse">
                  Uploading… {uploadProgress}%
                </p>
              </>
            )}
          </div>
        ) : (
          // Default UI
          <div className="flex flex-col items-center gap-3">
            <svg
              className="w-12 h-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 16V4m0 0l4 4m-4-4L8 8m-6 8h16a2 2 0 002-2V4m-2 2h2" />
            </svg>

            {isDragActive ? (
              <p className="text-gray-800 font-medium">Drop your file here…</p>
            ) : (
              <p className="text-gray-700">
                <strong>Click</strong> or <strong>Drag & Drop</strong> PDF / Image (max 10MB)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
