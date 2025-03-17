import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

conversation_history = []

@app.get("/chat")
def chat(prompt: str):
    global conversation_history

    previous_history = format_conversation()

    # Append user input to history
    conversation_history.append({"role": "user", "content": prompt})

    url = "http://localhost:11434/api/generate"  # Ollama API endpoint
    payload = {
        "model": "llama2",
        "prompt": f"""
        This is our conversation history:
        {previous_history}

        This is the new question:
        {prompt}

        Take into account our conversation history but don't respond to it like they are part of the prompt.
        """,
        "stream": False
    }
    response = requests.post(url, json=payload)
    ai_response = response.json().get("response", "")
    
    # Store AI response
    conversation_history.append({"role": "assistant", "content": ai_response})
    return {"response": ai_response}

def format_conversation():
    """Formats conversation history for better responses."""
    return "\n".join([f"{msg['role']}: {msg['content']}" for msg in conversation_history])

# Run using: uvicorn main:app --reload
