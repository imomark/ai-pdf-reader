import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Set up the PDF.js worker (required for react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PDFViewerProps = {
  file: File | null;
  setPageText: (text: string) => void; // Prop to share current page's text with parent
};

const PDFViewer: React.FC<PDFViewerProps> = ({ file, setPageText }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPageText, setCurrentPageText] = useState<string>("");

  // On PDF load, set total pages, save doc, and reset to first page
  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setPdfDoc(pdf);
    setPageNumber(1);
  };

  // Navigation controls
  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => (pdfDoc && prev < numPages ? prev + 1 : prev));

  // Extract page text any time the document or page changes
  useEffect(() => {
    const extractText = async () => {
      if (pdfDoc && pageNumber >= 1 && pageNumber <= numPages) {
        try {
          const page = await pdfDoc.getPage(pageNumber);
          const content = await page.getTextContent();
          const text = content.items.map((item: any) => item.str).join(" ");
          setCurrentPageText(text);
          setPageText(text); // Pass to parent App/QASection
        } catch (err) {
          setCurrentPageText("");
          setPageText("");
        }
      }
    };
    extractText();
  }, [pdfDoc, pageNumber, numPages, setPageText]);

  if (!file) return null;

  return (
    <div
      className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow"
      style={{ maxHeight: "80vh", overflow: "auto" }}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => alert("Error loading PDF: " + error.message)}
      >
        <Page
          pageNumber={pageNumber}
          width={500}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page <strong>{pageNumber}</strong> of {numPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Show extracted text for debugging (remove/comment in production) */}
      {/* <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-600 break-words">
        <strong>Extracted Text:</strong> {currentPageText || "No text found."}
      </div> */}
    </div>
  );
};

export default PDFViewer;
