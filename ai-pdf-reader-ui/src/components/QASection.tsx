import React, { useState } from "react";

type QASectionProps = {
  pageText: string;
};

const QASection: React.FC<QASectionProps> = ({ pageText }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // For now, just echo the user question and PDF text.
    // You'll send to AI backend later.
    setAnswer(
      `You asked: "${question}"\n\n(Text from page as context:)\n${pageText || "(No text found on current page)"}`
    );
  };

  return (
    <div className="mt-6 bg-white p-6 rounded shadow max-w-2xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about this page..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Ask
        </button>
      </form>
      {answer && (
        <div className="mt-2 p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
};

export default QASection;
