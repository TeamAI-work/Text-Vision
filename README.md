# Aura Studio — AI Workspace by GMS

> A full-stack, locally-run AI chat platform with multi-modal model support, designed for privacy-first document intelligence and conversational AI.

---

## Overview

**Aura Studio** is a premium AI workspace application developed by **GMS — The Technology Company**. It enables users to interact with locally-hosted large language models (LLMs) via Ollama, upload and query documents through a vector database pipeline, and manage their work across intelligent text and vision-based AI sessions — all without sending data to external cloud AI providers.

The application is built as a **React + Vite** single-page application (SPA) with a **FastAPI** backend that streams responses from Ollama in real time.

---

## Main Goals

- **Privacy-first AI** — All model inference runs locally via Ollama. No conversation data is sent to third-party AI APIs.
- **Multi-modal intelligence** — Supports both text-based and vision-based LLM workspaces.
- **Document ingestion** — Ingest and query uploaded documents through a vector database.
- **Streaming responses** — Real-time streamed output with thinking-mode support (`<think>` tags).
- **Persistent sessions** — Chats and projects are stored in Supabase with per-user authentication.
- **Premium UX** — Dark/light theming, glassmorphism design, and fully responsive layout.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & page transitions |
| **Lucide React** | Icon system |
| **React Router DOM v7** | Client-side routing |
| **React Markdown + remark-gfm** | Markdown rendering with GitHub Flavored Markdown |
| **React Syntax Highlighter** | Code block syntax highlighting |
| **Supabase JS** | Auth, database, and real-time subscriptions |

### Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | REST API server (Python) |
| **Uvicorn** | ASGI server for FastAPI |
| **Ollama** | Local LLM inference engine |
| **python-dotenv** | Environment variable management |
| **Pydantic** | Request schema validation |

### Infrastructure

| Service | Purpose |
|---|---|
| **Supabase** | PostgreSQL database, user authentication, and row-level security |
| **Ollama** | Serves local LLM models (e.g. `llama3`, `deepseek-r1`) |

---

## Project Structure

```
vt-ai/
├── backend/
│   ├── main.py              # FastAPI app entry point + CORS config
│   └── routes/
│       └── ai.py            # /chat streaming endpoint (Ollama integration)
│
├── src/
│   ├── assets/              # Static assets (logo SVG, images)
│   ├── Components/
│   │   ├── Auth/            # Login / signup flows
│   │   ├── Chat/            # Chat UI, message rendering, thinking state
│   │   ├── Help/            # Help Center, Contact Support, Bug Report, Privacy, Terms
│   │   ├── LandingPage/     # Landing page sections (Hero, BentoGrid, Footer, etc.)
│   │   ├── Plans/           # Subscription plans page
│   │   ├── Sidebar/         # Navigation sidebar with project/chat management
│   │   ├── Transition/      # Model workspace selection screen
│   │   └── models/          # AccountModel, ProjectManageModel, ChatManageModel
│   ├── App.jsx              # Route definitions
│   ├── index.css            # Global design system & CSS variables
│   ├── main.jsx             # React entry point
│   └── supabaseClient.js    # Supabase client initialization
│
├── .env.local               # Frontend environment variables (Supabase keys)
├── package.json
└── vite.config.js
```

---

## Installation & Setup

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **Ollama** installed and running — [https://ollama.com](https://ollama.com)
- A **Supabase** project — [https://supabase.com](https://supabase.com)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-org/vt-ai.git
cd vt-ai
```

---

### 2. Frontend setup

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

### 3. Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install fastapi uvicorn ollama python-dotenv pydantic
```

Create a `.env` file inside `backend/`:

```env
OLLAMA_MODEL=llama3
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

---

### 4. Start Ollama

Make sure Ollama is running and the required model is pulled:

```bash
ollama serve
ollama pull llama3
```

For vision support, pull a vision-capable model:

```bash
ollama pull llava
```

---

### 5. Supabase database

Create the following tables in your Supabase project:

**`users`**
```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text unique,
  email text,
  created_at timestamptz default now()
);
```

**`chats`**
```sql
create table chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  messages jsonb default '[]',
  project_id uuid,
  created_at timestamptz default now()
);
```

**`projects`**
```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text,
  description text,
  created_at timestamptz default now()
);
```

Enable **Row Level Security (RLS)** on all tables and add policies so users can only access their own data.

---

## Chat Modes

The `/chat` API endpoint supports the following `mode` values:

| Mode | Behaviour |
|---|---|
| `default` | Standard helpful assistant |
| `thinking` | Deep analytical reasoning with `<think>` block streaming |
| `research` | Comprehensive, structured research output |
| `web` | Real-time web-aware assistant (model must support it) |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `uvicorn main:app --reload` | Start the FastAPI backend with hot reload |

---

## License

© 2026 GMS — The Technology Company. All rights reserved.
