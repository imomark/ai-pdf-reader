import React, { useState } from "react";
import ReactMarkdown from "react-markdown";


type QASectionProps = {
  pageText: string;
};

const QASection: React.FC<QASectionProps> = ({ pageText }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          context: pageText,
        }),
      });

      if (!res.ok) throw new Error("Backend error: " + res.status);
      const data = await res.json();
      // Adjust the path below to match your backend's exact JSON return
      console.log("Response data:", data);
      setAnswer(data.choices?.[0]?.message?.content || "No answer");
    } catch (err: any) {
      setAnswer("Error: " + err.message);
    }

    setLoading(false);
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
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {answer && (
  <div className="mt-4 flex w-full justify-center">
    <div className="w-full max-w-xl">
      <div className="flex gap-2 items-start">
        {/* Optional icon */}
        <div className="flex-shrink-0 pt-1">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-lg font-bold">
            AI
          </span>
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 border border-blue-100 rounded-lg p-3 shadow-sm transition-colors">
            <div className="mb-1 font-semibold text-blue-700 text-sm">AI Answer:</div>
            <div className="prose prose-blue whitespace-pre-line text-gray-800 text-base leading-relaxed">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default QASection;
