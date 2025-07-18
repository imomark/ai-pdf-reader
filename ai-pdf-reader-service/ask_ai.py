from fastapi import FastAPI, Request
import requests
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend dev on localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

@app.post("/api/ask")
async def ask_question(request: Request):
    data = await request.json()
    question = data.get("question")
    context = data.get("context")

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistral-7b-instruct",  # or "mixtral-8x7b-instruct"
        "messages": [
            { "role": "user", "content": f"Answer the question: {question}\n\nContext:\n{context}" }
        ]
    }

    response = requests.post("https://api.perplexity.ai/chat/completions", headers=headers, json=payload)
    return response.json()
