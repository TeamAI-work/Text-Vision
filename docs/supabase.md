# Supabase Integration — Aura Studio

**Supabase** is used as the cloud backend for Aura Studio. It handles user authentication, stores chats and projects in a PostgreSQL database, and provides real-time capabilities via its JavaScript SDK.

---

## What Supabase Provides

| Feature | Usage in Aura Studio |
|---|---|
| **Auth** | Email/password login and signup |
| **PostgreSQL** | Stores users, chats, and projects |
| **Row Level Security** | Each user can only access their own data |
| **Supabase JS SDK** | Frontend data fetching and auth state management |

---

## Setup

### 1. Create a Supabase project

Go to [https://supabase.com](https://supabase.com), create a new project, and note your:
- **Project URL**: `https://your-project.supabase.co`
- **Anon public key**: found in Project Settings → API

### 2. Add environment variables

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Client initialisation — `src/supabaseClient.js`

```js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

This singleton client is imported across all components that need database or auth access.

---

## Database Schema

### `users` table

Stores extended profile data linked to the Supabase Auth user.

```sql
create table users (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  username   text unique,
  email      text,
  created_at timestamptz default now()
);
```

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Internal row ID |
| `user_id` | UUID | Foreign key → `auth.users.id` |
| `username` | text | Unique display name |
| `email` | text | User email address |
| `created_at` | timestamptz | Record creation timestamp |

---

### `chats` table

Stores individual chat sessions. Each chat belongs to a user and optionally a project.

```sql
create table chats (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  title      text,
  messages   jsonb default '[]',
  project_id uuid,
  created_at timestamptz default now()
);
```

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Chat session ID |
| `user_id` | UUID | Owner of the chat |
| `title` | text | Chat display name |
| `messages` | jsonb | Array of `{ role, content }` objects |
| `project_id` | UUID | Optional link to a project |
| `created_at` | timestamptz | Creation timestamp |

**Message format stored in `messages` jsonb:**
```json
[
  { "role": "user", "content": "Hello" },
  { "role": "ai",   "content": "Hi! How can I help you today?" }
]
```

---

### `projects` table

Organises chats into named workspaces.

```sql
create table projects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  name        text,
  description text,
  created_at  timestamptz default now()
);
```

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Project ID |
| `user_id` | UUID | Owner of the project |
| `name` | text | Project display name |
| `description` | text | Optional project description |
| `created_at` | timestamptz | Creation timestamp |

---

## Row Level Security (RLS)

**Always enable RLS** on all tables to prevent users from reading each other's data.

```sql
-- Enable RLS
alter table users   enable row level security;
alter table chats   enable row level security;
alter table projects enable row level security;
```

**RLS policies — users can only access their own rows:**

```sql
-- users table
create policy "Users can view own profile"
  on users for select using (auth.uid() = user_id);

create policy "Users can update own profile"
  on users for update using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on users for insert with check (auth.uid() = user_id);

-- chats table
create policy "Users can manage own chats"
  on chats for all using (auth.uid() = user_id);

-- projects table
create policy "Users can manage own projects"
  on projects for all using (auth.uid() = user_id);
```

---

## Authentication

Aura Studio uses Supabase's built-in Auth with **email + password**.

### Sign up
```js
const { data, error } = await supabase.auth.signUp({
    email: "user@example.com",
    password: "securepassword",
});
```

### Sign in
```js
const { data, error } = await supabase.auth.signInWithPassword({
    email: "user@example.com",
    password: "securepassword",
});
```

### Sign out
```js
await supabase.auth.signOut();
```

### Get current user
```js
const { data: { user } } = await supabase.auth.getUser();
```

### Listen for auth state changes
```js
supabase.auth.onAuthStateChange((event, session) => {
    // event: "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED"
    // session.user — the authenticated user object
});
```

---

## Common Data Operations

### Fetch user profile
```js
const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id);
```

### Upsert username
```js
await supabase
    .from("users")
    .update({ username: "new_name" })
    .eq("user_id", user.id);
```

### Fetch all chats for a user
```js
const { data: chats } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
```

### Save a new message to a chat
```js
await supabase
    .from("chats")
    .update({ messages: updatedMessages })
    .eq("id", chatId);
```

### Delete all chats for a user
```js
await supabase
    .from("chats")
    .delete()
    .eq("user_id", user.id);
```

### Create a new project
```js
await supabase
    .from("projects")
    .insert({ user_id: user.id, name: "My Project" });
```

---

## Error Handling Patterns

Supabase returns `{ data, error }` for every operation. Always check for errors:

```js
const { data, error } = await supabase.from("chats").select("*");

if (error) {
    console.error("Supabase error:", error.message);
    return;
}

// use data safely
```

Common error codes:
| Code | Meaning |
|---|---|
| `23505` | Unique constraint violation (e.g. duplicate username) |
| `42501` | RLS policy blocked the operation |
| `PGRST116` | No rows found (`.single()` call) |

---

## Security Notes

- **Never expose your `service_role` key** on the frontend — only use the `anon` key.
- Always enable RLS before deploying to production.
- Use `auth.uid()` in RLS policies — never trust user-provided `user_id` values.
- The anon key is safe to expose publicly; RLS policies enforce access control at the database level.
