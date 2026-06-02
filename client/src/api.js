export async function checkHealth() {
  const res = await fetch("/api/health");
  if (!res.ok) throw new Error("API unavailable");
  return res.json();
}

export async function loadSampleQuiz() {
  const res = await fetch("/api/sample");
  if (!res.ok) throw new Error("Could not load sample quiz.");
  const data = await res.json();
  return data.questions;
}

export async function extractFromPdf(file) {
  const form = new FormData();
  form.append("pdf", file);
  const res = await fetch("/api/extract", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Extraction failed.");
  return data.questions;
}

export async function extractFromText(text) {
  const res = await fetch("/api/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Extraction failed.");
  return data.questions;
}

