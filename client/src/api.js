import { sampleQuestions } from "./data/sampleQuestions.js";

/** Empty string = same origin (Vercel /api routes or dev proxy). Set VITE_API_URL for external API. */
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function apiUrl(path) {
  return `${API_BASE}${path}`;
}

async function readJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function checkHealth() {
  try {
    const res = await fetch(apiUrl("/api/health"));
    if (!res.ok) throw new Error("API unavailable");
    return res.json();
  } catch {
    return { ok: false, aiConfigured: false, apiAvailable: false };
  }
}

/** Sample quiz runs from bundled data so it works without a backend. */
export async function loadSampleQuiz() {
  return sampleQuestions.map((q) => ({ ...q }));
}

async function fileToBase64(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function extractFromPdf(file) {
  const pdfBase64 = await fileToBase64(file);
  const res = await fetch(apiUrl("/api/extract"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pdfBase64, filename: file.name }),
  });
  const data = await readJson(res);
  return data.questions;
}

export async function extractFromText(text) {
  const res = await fetch(apiUrl("/api/extract"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await readJson(res);
  return data.questions;
}
