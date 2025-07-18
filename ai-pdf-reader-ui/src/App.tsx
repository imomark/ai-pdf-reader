import React, { useState } from "react";
import UploadSection from "./components/UploadSection";
import PDFViewer from "./components/PDFViewer";
import QASection from "./components/QASection";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageText, setPageText] = useState<string>("");

  // Pass setPageText to PDFViewer so it sets this state on each page
  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 my-4">AI PDF Reader</h1>
      <div className="flex flex-1 w-full max-w-5xl gap-8 overflow-hidden">
        <div className="max-w-xs w-full h-full overflow-auto">
          <UploadSection setSelectedFile={setSelectedFile} />
        </div>
        <div className="flex-1 h-full overflow-auto flex flex-col items-center">
          <PDFViewer file={selectedFile} setPageText={setPageText} />
          <QASection pageText={pageText} />
        </div>
      </div>
    </div>
  );
}




export default App;
