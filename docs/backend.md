# Backend — Aura Studio

The backend is a lightweight **FastAPI** application written in Python. Its sole responsibility is to receive chat requests from the frontend and stream AI-generated responses from the locally running **Ollama** LLM engine.

---

## Directory Structure

```
backend/
├── main.py          # FastAPI application entry point
├── .env             # Environment variables (OLLAMA_MODEL)
└── routes/
    └── ai.py        # /chat streaming endpoint
```

---

## Entry Point — `main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ai import router as ai_router

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:5174"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router)
```

### What it does
- Initialises the FastAPI application
- Configures **CORS** to allow requests from the Vite frontend (port 5173/5174)
- Mounts the AI router which exposes the `/chat` endpoint

---

## AI Router — `routes/ai.py`

### Request Schema

```python
class ChatRequest(BaseModel):
    message: str                      # The user's current message
    model: Optional[str] = None       # Ollama model name (defaults to env var)
    mode: Optional[str] = None        # Inference mode
    history: Optional[List[dict]] = None  # Prior conversation turns
```

### Chat Modes

| Mode | System Prompt Behaviour |
|---|---|
| `default` | Standard helpful and concise assistant |
| `thinking` | Deep step-by-step reasoning; wraps internal thoughts in `<think>` tags |
| `research` | Comprehensive, structured, and accuracy-focused output |
| `web` | Web-aware assistant (requires a capable model) |

### Streaming Architecture

The `/chat` endpoint returns a `StreamingResponse` — text tokens are streamed to the frontend as they are generated rather than waiting for the full completion.

Because `ollama.chat()` is a **blocking** generator, it is offloaded to a thread pool executor to avoid blocking the async event loop:

```
Frontend HTTP request
    │
    ▼
FastAPI async handler
    │
    ├── asyncio.Queue created
    │
    ├── _producer() launched in thread pool (run_in_executor)
    │       └── ollama.chat(..., stream=True)
    │               └── puts each chunk → queue
    │
    └── async generator reads from queue
            └── yields tokens → StreamingResponse → Frontend
```

### Thinking Block Handling

When the model emits a `thinking` field in a chunk (e.g. DeepSeek-R1), the backend wraps the content in `<think>...</think>` tags before streaming. The frontend parses these tags to render a collapsible "Thinking" state.

```python
if thinking:
    if not in_think_block:
        yield "<think>"
        in_think_block = True
    yield thinking
else:
    if in_think_block:
        yield "</think>"
        in_think_block = False
    if content:
        yield content
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
OLLAMA_MODEL=llama3
```

| Variable | Default | Description |
|---|---|---|
| `OLLAMA_MODEL` | `llama3` | The default Ollama model to use if none is specified in the request |

---

## Running the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # macOS/Linux

pip install fastapi uvicorn ollama python-dotenv pydantic

uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

---

## API Reference

### `POST /chat`

Streams an AI response token-by-token.

**Request body:**
```json
{
  "message": "Explain transformers in ML",
  "model": "llama3",
  "mode": "thinking",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "ai", "content": "Hi! How can I help?" }
  ]
}
```

**Response:** `text/plain` stream — raw token text, streamed incrementally.

> Note: `history` role values of `"ai"` are automatically remapped to `"assistant"` for Ollama compatibility.

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| Ollama not running | Stream yields `[Ollama Error: ...]` |
| Model not found | Error propagated via queue and yielded to frontend |
| General stream error | Yields `[Stream Error: ...]` |
