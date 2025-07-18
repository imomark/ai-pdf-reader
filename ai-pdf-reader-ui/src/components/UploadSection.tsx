import React, { useRef, useState } from "react";

const UploadSection: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadButton = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a PDF file before submitting.");
      return;
    }
    alert(`File "${selectedFile.name}" selected. Ready for backend integration!`);
    // This is where you'll later send the file to your backend.
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-md w-full mt-8 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload a PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleUploadButton}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
        >
          Choose PDF File
        </button>
        {selectedFile && (
          <div className="mt-2 text-gray-700 text-sm">
            Selected: <span className="font-bold">{selectedFile.name}</span>
          </div>
        )}
        <button
          type="submit"
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadSection;
