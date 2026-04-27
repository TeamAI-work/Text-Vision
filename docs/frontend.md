# Frontend — Aura Studio

The frontend is a **React 19 + Vite 8** single-page application. It is styled with **Tailwind CSS 4** and animated with **Framer Motion**. All routing is handled client-side via **React Router DOM v7**.

---

## Directory Structure

```
src/
├── assets/                    # Static files (logo SVG, images)
├── Components/
│   ├── Auth/                  # Login and signup screens
│   ├── Chat/                  # Core chat interface
│   ├── Help/                  # Support pages
│   │   ├── HelpCenter.jsx
│   │   ├── ContactSupport.jsx
│   │   ├── Bugreport.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   └── Terms.jsx
│   ├── LandingPageComponents/ # Marketing/landing page sections
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── BentoGrid.jsx
│   │   ├── Working.jsx
│   │   ├── TextWorkspace.jsx
│   │   ├── VisionWorkspace.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   └── GmsLogo.jsx        # Inline SVG branding component
│   ├── Plans/                 # Subscription plans page
│   ├── Sidebar/               # App sidebar with chat/project navigation
│   ├── Transition/            # Workspace type selection screen
│   │   └── TransitionPage.jsx
│   └── models/                # Modal dialog components
│       ├── AccountModel.jsx
│       ├── ProjectmanageModel.jsx
│       └── ChatManageModel.jsx
├── App.jsx                    # Route configuration
├── index.css                  # Global design system & CSS variables
├── main.jsx                   # React entry point
└── supabaseClient.js          # Supabase client instance
```

---

## Routing — `App.jsx`

All routes are defined using React Router DOM. The app uses a public landing page and a protected authenticated app section.

| Route | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Marketing home page |
| `/app` | `TransitionPage` | Model workspace selector |
| `/chat` | `Chat` | Main AI chat interface |
| `/plans` | `Plans` | Subscription plans |
| `/help` | `HelpCenter` | FAQ & support articles |
| `/contact-support` | `ContactSupport` | Contact form |
| `/bug-report` | `Bugreport` | Bug reporting form |
| `/privacy` | `PrivacyPolicy` | Privacy policy |
| `/terms` | `Terms` | Terms of service |

---

## Design System — `index.css`

The entire UI is driven by **CSS custom properties** (variables) defined in `index.css`. This enables instant dark/light mode switching by toggling a `.light` class on `<html>`.

### Key variables

```css
:root {
  /* Background layers */
  --obsidian: #0D0D0E;
  --charcoal: #161618;
  --paper: #F4F4F5;

  /* Text */
  --txt-primary: #F4F4F5;
  --txt-secondary: #c8c8cc;
  --txt-muted: #6b6b6e;

  /* Brand */
  --sage: #8BA88E;
  --red: #FF0000;

  /* Theme-aware */
  --gms-text-color: #ffffff;   /* → #0D0D0E in .light */
  --gms-logo-color: #FF0000;   /* Always red */
}

.light {
  --obsidian: #FAFAFA;
  --charcoal: #F0F0F2;
  --paper: #0D0D0E;
  --gms-text-color: #0D0D0E;
  /* ... */
}
```

### Theme toggling

The `AccountModel` settings panel toggles the `.light` class on `document.documentElement` and persists the choice to `localStorage`:

```js
document.documentElement.classList.toggle("light");
localStorage.setItem("theme", isDark ? "dark" : "light");
```

---

## Key Components

### `Chat/Chat.jsx`
The core chat interface. Handles:
- Streaming text from `POST /chat` via `fetch` with `ReadableStream`
- Markdown rendering with `react-markdown` + `remark-gfm`
- Syntax-highlighted code blocks via `react-syntax-highlighter`
- Thinking block parsing (`<think>...</think>` → animated collapsible panel)
- Message persistence to Supabase

### `Transition/TransitionPage.jsx`
A full-screen model selection screen shown after login. Users choose between:
- **Text Model** — standard LLM conversation
- **Vision Model** — multi-modal image + text

Uses `backdrop-blur-xl` glassmorphism cards with model-specific gradient theming.

### `Sidebar/`
The persistent navigation sidebar inside the app. Provides:
- Project list with create/delete
- Chat history per project
- User profile menu (opens `AccountModel`)

### `models/AccountModel.jsx`
A settings modal with four tabs:
| Tab | Content |
|---|---|
| General | Theme toggle, accent color |
| Data Controls | Manage/delete chats and projects |
| Account | Username editing, email display |
| Subscriptions | Current plan, upgrade CTA |

Fully responsive: sidebar navigation on desktop, horizontal scrollable tabs on mobile.

### `LandingPageComponents/GmsLogo.jsx`
An inline SVG React component that renders the GMS branding logo. Uses `fill="var(--gms-text-color)"` on the `<g>` group so the "THE TECHNOLOGY COMPANY" text adapts to dark/light mode, while the GMS letter stripes remain `fill="#FF0000"` in both modes.

---

## Typography System — `fontSize`

Each page component defines a local `fontSize` object for consistent, responsive typography:

```js
const fontSize = {
    title:     "font-serif text-2xl md:text-3xl lg:text-4xl",
    subtitle:  "font-serif text-sm md:text-base lg:text-lg",
    text:      "font-sans text-sm md:text-base lg:text-lg",
    button:    "font-sans text-xs md:text-sm lg:text-base",
    link:      "font-sans text-xs md:text-sm lg:text-base",
    input:     "font-sans text-xs md:text-sm lg:text-base",
    faq:       "font-serif text-xl md:text-2xl lg:text-3xl",
    faqAnswer: "font-sans text-xs md:text-sm lg:text-base",
}
```

Usage:
```jsx
<h1 className={`${fontSize.title} mb-6`}>Page Title</h1>
<p className={`${fontSize.text} text-txt-muted`}>Body copy</p>
```

---

## Dependencies

```json
"react": "^19.2.4",
"react-dom": "^19.2.4",
"react-router-dom": "^7.14.1",
"framer-motion": "^12.38.0",
"lucide-react": "^1.8.0",
"react-markdown": "^10.1.0",
"remark-gfm": "^4.0.1",
"react-syntax-highlighter": "^16.1.1",
"@supabase/supabase-js": "^2.39.3",
"tailwindcss": "^4.2.2"
```

---

## Running the Frontend

```bash
npm install
npm run dev
```

Available at: `http://localhost:5173`
