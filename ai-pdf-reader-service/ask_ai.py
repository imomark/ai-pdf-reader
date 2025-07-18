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

PERPLEXITY_API_KEY = "key"

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
        "model": "sonar-pro",  # or "mixtral-8x7b-instruct"
        "messages": [
            { "role": "user","content": f"Answer the question concisely: {question}\n\nBe brief and to-the-point. Use the following context:\n{context}" }
        ]
    }

    response = requests.post("https://api.perplexity.ai/chat/completions", headers=headers, json=payload)
    return response.json()
