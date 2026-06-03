# Study Quiz — MVP

Fullstack quiz app for study platforms: upload a PDF or paste text, AI extracts multiple-choice questions with explanations, then practice with instant feedback.

## Stack

- **Client:** React 19, Vite, JavaScript (JSX), Tailwind CSS
- **Server:** Express, `pdf-parse`, OpenAI (`gpt-4o-mini`)

## Quick start

```bash
npm run install:all
cp server/.env.example server/.env
# Add OPENAI_API_KEY to server/.env (optional for demo)
npm run dev
```

- App: http://localhost:5173  
- API: http://localhost:3001  

Without `OPENAI_API_KEY`, PDF/text upload returns built-in sample questions so you can try the UI immediately.

## Features (MVP)

- Upload PDF or paste exam text → AI JSON extraction
- One-question-at-a-time quiz with check / next flow
- Explanations for correct and incorrect choices
- Progress bar and results summary with review
- Responsive layout, minimal correct-answer pulse animation
- Sample quiz without uploading

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health + AI configured flag |
| GET | `/api/sample` | Demo questions |
| POST | `/api/extract` | `multipart` field `pdf` or JSON `{ "text": "..." }` |

Response shape matches the quiz JSON schema (`questions` array).

## Deploy on Vercel (frontend)

This repo has **no TypeScript** — the client build is only `vite build`.

1. Push latest code to GitHub.
2. In Vercel → **Project Settings → General → Root Directory**: leave empty (uses repo root `vercel.json`) **or** set to `client` (uses `client/vercel.json`).
3. In **Build & Development Settings**, clear any custom **Build Command** override. It must **not** contain `tsc`. Use the default from `vercel.json` or `vite build`.
4. **Output Directory**: `client/dist` (root deploy) or `dist` (if root directory is `client`).

The API (`server/`) must be hosted separately (e.g. Render, Railway) for PDF/AI features in production; set `OPENAI_API_KEY` there and proxy `/api` or point the client to that URL.
