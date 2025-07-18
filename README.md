# 🧠 AI PDF Reader

An AI-powered PDF reader built with **React (Vite + TypeScript + Tailwind CSS)** and a **FastAPI backend**.  
Users can upload a PDF, preview its pages, and ask the AI questions about each page using Perplexity’s language models.

---

## 🗂️ Folder Structure

ai-pdf-reader/
├─ ai-pdf-reader-ui/ # Frontend (React, Vite, Tailwind)
├─ backend/ # Backend (FastAPI)
└─ README.md


---

# 🌐 Frontend Setup (`ai-pdf-reader-ui`)

1. **Install dependencies:**

    ```
    cd ai-pdf-reader-ui
    npm install
    ```

2. **Start the development server:**

    ```
    npm run dev
    ```
    The frontend should run at [http://localhost:5173](http://localhost:5173).

3. **Tech Stack:**
    - [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
    - [Tailwind CSS](https://tailwindcss.com/) ([PostCSS](https://postcss.org/) config as needed)[2]
    - [react-pdf](https://github.com/wojtekmaj/react-pdf) for PDF display and text extraction
    - [react-markdown](https://github.com/remarkjs/react-markdown) for rendering Markdown in answers

4. **Features:**
    - Upload and preview PDF files (single page navigation)
    - Extract text per page
    - Ask questions; view formatted AI answers (Markdown supported)
    - Responsive, accessible, beginner-friendly UI[1][2]

---

# 🧠 Backend Setup (`backend`)

1. **Install dependencies:**

    ```
    cd backend
    pip install fastapi uvicorn requests python-dotenv
    ```

2. **Create a `.env` file:**

    ```
    PERPLEXITY_API_KEY=ptkn_your_key_from_perplexity
    ```

3. **Start the FastAPI server:**

    ```
    uvicorn ask_ai:app --reload
    ```
    The backend should run at [http://localhost:8000](http://localhost:8000).

4. **API Endpoint:**

    ```
    POST /api/ask
    {
      "question": "What is AI?",
      "context": "Extracted text from PDF page..."
    }
    ```

5. **Features:**
    - Receives frontend question/context, calls the Perplexity API, and returns a concise, context-aware answer.

---

# 💬 Usage

1. **Go to the frontend app:** [http://localhost:5173](http://localhost:5173)
2. **Upload a PDF file.**
3. **Navigate PDF pages** and see the text extracted per page.
4. **Ask any question** about the currently displayed page in the provided input.
5. **Read the AI's formatted/Markdown-friendly answer** (bold, lists, headings, etc.).

---

# ✨ Tech Highlights

- **Beginner-friendly codebase:** Clean, readable, and fully commented[1]
- **Modern responsive UI:** Built with Tailwind CSS and PostCSS[2]
- **Secure:** Backend never exposes or stores AI API keys in the frontend
- **Configurable:** Easily switch to other AI APIs if desired

---

# 🛠️ Quick Troubleshooting

- **CORS errors:** Ensure backend has CORS enabled for `http://localhost:5173`
- **API key issues:** Double-check `.env` and restart backend if changed
- **PDFs not displaying:** Make sure `react-pdf` and `pdfjs-dist` are installed in the frontend

---

# 🛡️ License

MIT License.

---

### Built with a focus on clarity, clean UX, and beginner programming principles.[1][2]
