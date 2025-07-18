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

      const data = await res.json();
      setAnswer(data.choices?.[0]?.message?.content || "No answer");
    } catch (err: any) {
      setAnswer("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about this page..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold transition"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-2 items-start">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-200 text-blue-800 text-lg font-bold">
            AI
          </span>
          <div className="flex-1 prose prose-blue whitespace-pre-wrap text-base">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QASection;
