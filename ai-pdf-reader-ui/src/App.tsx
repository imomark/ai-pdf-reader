import { useState } from "react";
import UploadSection from "./components/UploadSection";
import PDFViewer from "./components/PDFViewer";
import QASection from "./components/QASection";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageText, setPageText] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">AI PDF Reader</h1>
      </div>

      {/* Side-by-side layout with left column and PDF Viewer */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full">
        {/* Left Column: Upload + QASection in a card */}
        <div className="flex flex-col gap-y-8 w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6">
          {/* Upload Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-blue-700">Upload PDF</h2>
            <UploadSection setSelectedFile={setSelectedFile} />
          </div>

          {/* QA Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-blue-700">Ask About This Page</h2>
            <QASection pageText={pageText} />
          </div>
        </div>

        {/* Right Column: PDF Viewer in its own card */}
        <div className="w-full md:w-1/2 flex items-start">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full h-fit">
            <PDFViewer file={selectedFile} setPageText={setPageText} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
