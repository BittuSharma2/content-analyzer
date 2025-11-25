import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ onFileSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "image/*": [] }
  });

  return (
    <div
      {...getRootProps()}
      className="
        border-2 border-dashed border-gray-400
        p-10 rounded-xl cursor-pointer transition
        hover:bg-gray-100 text-center
      "
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-3">
        <svg
          className="w-12 h-12 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16V4m0 0l4 4m-4-4L8 8m-6 8h16a2 2 0 002-2V4m-2 2h2"
          />
        </svg>

        {isDragActive ? (
          <p className="text-gray-800 font-medium">Drop the file here...</p>
        ) : (
          <p className="text-gray-700">
            <strong>Click</strong> or <strong>Drag & Drop</strong> to upload PDF/Image
          </p>
        )}
      </div>
    </div>
  );
}
