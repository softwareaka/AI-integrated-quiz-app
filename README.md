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

## Deploy on Vercel

This repo deploys the **React app** and **API routes** (`/api/*`) on one Vercel project.

1. Push latest code to GitHub.
2. Use repo root (default `vercel.json`) — do **not** set Root Directory to `client` only.
3. Build command: `npm run build --prefix client` (no `tsc`).
4. In Vercel → **Environment Variables**, add `OPENAI_API_KEY` for real AI extraction (optional; without it, uploads use sample questions).

**Sample quiz** works offline in the browser (bundled data). **PDF/text** use Vercel serverless functions in `/api`.

For a separate Express host, set `VITE_API_URL` in the client to that URL.
