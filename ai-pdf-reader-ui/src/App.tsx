import { useState } from "react";
import UploadSection from "./components/UploadSection";
import PDFViewer from "./components/PDFViewer";
import QASection from "./components/QASection";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageText, setPageText] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">AI PDF Reader</h1>
      </div>

      {/* Columns: Left = Upload + QA, Right = PDFViewer */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full">
        {/* Left Column: Upload + QA Section (stacked) */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <UploadSection setSelectedFile={setSelectedFile} />
          <QASection pageText={pageText} />
        </div>

        {/* Right Column: PDF Viewer */}
        <div className="w-full md:w-1/2">
          <PDFViewer file={selectedFile} setPageText={setPageText} />
        </div>
      </div>
    </div>
  );
}

export default App;
