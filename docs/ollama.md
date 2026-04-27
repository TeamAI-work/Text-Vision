# Ollama Integration — Aura Studio

**Ollama** is the local LLM runtime used by Aura Studio. It runs entirely on-device, meaning no conversation data is ever sent to external AI services. The backend communicates with Ollama via the official `ollama` Python library.

---

## What is Ollama?

Ollama is an open-source tool that lets you run large language models locally on your machine. It manages model downloads, GPU/CPU inference, and exposes a local API that applications can query.

- Website: [https://ollama.com](https://ollama.com)
- Supports models: Llama 3, DeepSeek-R1, Mistral, LLaVA (vision), Gemma, and many more.

---

## Installation

### 1. Install Ollama

Download and install from [https://ollama.com/download](https://ollama.com/download).

On Windows, run the installer. On macOS/Linux:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Start the Ollama service

```bash
ollama serve
```

This starts Ollama's local API at `http://localhost:11434`.

### 3. Pull models

Pull the text model (default):
```bash
ollama pull llama3
```

Pull a thinking/reasoning model:
```bash
ollama pull deepseek-r1
```

Pull a vision-capable model:
```bash
ollama pull llava
```

List installed models:
```bash
ollama list
```

---

## How Aura Studio Uses Ollama

### Python library

The backend uses the `ollama` Python package:

```bash
pip install ollama
```

### Calling the model

```python
import ollama

for chunk in ollama.chat(
    model="llama3",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is machine learning?"}
    ],
    stream=True
):
    print(chunk.message.content, end="", flush=True)
```

---

## Message History Format

Aura Studio sends the full conversation history with every request so the model maintains context:

```python
messages = [
    {"role": "system", "content": "<mode-specific system prompt>"},
    {"role": "user",      "content": "First message"},
    {"role": "assistant", "content": "First reply"},
    {"role": "user",      "content": "Current message"},
]
```

> **Note:** The frontend stores role values as `"ai"` internally. The backend remaps these to `"assistant"` before passing to Ollama, which only accepts `"user"` and `"assistant"`.

---

## Inference Modes

The `mode` field in the request body selects a different system prompt:

| Mode | System Prompt |
|---|---|
| `default` | `"You are a helpful and concise AI assistant."` |
| `thinking` | `"You are a highly analytical assistant. Provide deep, step-by-step reasoning for every query. Wrap your internal thoughts in <think> tags."` |
| `research` | `"You are a research expert. Provide comprehensive, well-structured, and verified information. Focus on depth and accuracy."` |
| `web` | `"You are an assistant with real-time web access capabilities. Focus on providing up-to-date and relevant information from the web."` |

---

## Streaming Architecture

The `ollama.chat()` call with `stream=True` is a blocking Python generator. Because FastAPI is async, it is run in a **thread pool executor** to prevent blocking the event loop, and an `asyncio.Queue` bridges the blocking producer with the async consumer:

```
┌────────────────────────────────────────────────────────┐
│  Thread Pool (run_in_executor)                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  _producer()                                     │  │
│  │  for chunk in ollama.chat(..., stream=True):     │  │
│  │      queue.put_nowait(chunk)                     │  │
│  │  queue.put_nowait(None)  # sentinel              │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
                        │
                  asyncio.Queue
                        │
┌────────────────────────────────────────────────────────┐
│  Async Generator (stream_ollama_async)                 │
│  while True:                                           │
│      chunk = await queue.get()                         │
│      if chunk is None: break                           │
│      yield chunk.message.content                       │
└────────────────────────────────────────────────────────┘
                        │
               StreamingResponse
                        │
                   Frontend (fetch)
```

---

## Thinking Block Support

Models like **DeepSeek-R1** emit a separate `thinking` field in their response chunks alongside `content`. Aura Studio's backend detects this and wraps the reasoning content in `<think>...</think>` tags:

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

The frontend parses these tags and renders them as a collapsible animated "Thinking..." panel.

---

## Changing the Default Model

Set the default model in `backend/.env`:

```env
OLLAMA_MODEL=deepseek-r1
```

The frontend can also override this per-request by sending a `model` field in the request body.

---

## Recommended Models

| Use Case | Recommended Model |
|---|---|
| General chat | `llama3` |
| Analytical / coding | `deepseek-r1` or `codellama` |
| Vision / image analysis | `llava` |
| Fast / lightweight | `mistral` or `gemma` |

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `Connection refused` on `/chat` | Ensure `ollama serve` is running |
| `model not found` error | Run `ollama pull <model-name>` |
| Very slow responses | The model may be running on CPU — check GPU drivers / CUDA setup |
| Stream cuts off early | Ensure `uvicorn` is not timing out (default is no timeout) |
