import { useRef, useState } from "react";

export default function HomeView({
  aiConfigured,
  apiAvailable,
  loading,
  error,
  onSample,
  onPdf,
  onText,
}) {
  const fileRef = useRef(null);
  const [pasteText, setPasteText] = useState("");
  const [tab, setTab] = useState("pdf");

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) onPdf(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-8">
      <section className="text-center sm:text-left">
        <h1 className="font-display text-3xl font-bold text-study-800 sm:text-4xl">
          Turn study material into quizzes
        </h1>
        <p className="mt-3 text-study-600 leading-relaxed">
          Upload a PDF or paste exam content. AI extracts multiple-choice questions with
          explanations so you can practice with instant feedback.
        </p>
        {!apiAvailable && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            <strong>API offline.</strong> Sample quiz still works. PDF/text needs the API
            (redeploy or run <code className="text-xs">npm run dev</code> locally).
          </p>
        )}
        {apiAvailable && !aiConfigured && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Demo mode:</strong> Add <code className="text-xs">OPENAI_API_KEY</code> in
            Vercel env vars (or <code className="text-xs">server/.env</code> locally) for real AI
            extraction. Until then, uploads use sample questions.
          </p>
        )}
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <section className="rounded-2xl border border-study-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex gap-2 rounded-lg bg-study-100 p-1">
          <button
            type="button"
            onClick={() => setTab("pdf")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === "pdf" ? "bg-white text-study-800 shadow-sm" : "text-study-500"
            }`}
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setTab("text")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === "text" ? "bg-white text-study-800 shadow-sm" : "text-study-500"
            }`}
          >
            Paste text
          </button>
        </div>

        {tab === "pdf" ? (
          <div className="space-y-4">
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFile}
              disabled={loading}
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => fileRef.current && fileRef.current.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-study-200 bg-study-50 px-4 py-10 text-study-600 transition-colors hover:border-accent hover:bg-accent-light disabled:opacity-60"
            >
              <span className="text-3xl" aria-hidden>
                📄
              </span>
              <span className="font-medium">
                {loading ? "Extracting questions…" : "Choose a PDF file"}
              </span>
              <span className="text-xs text-study-500">Max 10 MB</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste exam or PDF text here…"
              rows={8}
              disabled={loading}
              className="w-full resize-y rounded-xl border border-study-200 bg-study-50 px-4 py-3 text-sm text-study-800 placeholder:text-study-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            />
            <button
              type="button"
              disabled={loading || !pasteText.trim()}
              onClick={() => onText(pasteText)}
              className="w-full rounded-xl bg-study-800 py-3 text-sm font-semibold text-white transition-colors hover:bg-study-700 disabled:opacity-50"
            >
              {loading ? "Extracting questions…" : "Generate quiz"}
            </button>
          </div>
        )}
      </section>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-study-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-study-50 px-3 text-study-500">or</span>
        </div>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={onSample}
        className="w-full rounded-xl border border-study-200 bg-white py-3 text-sm font-semibold text-study-700 shadow-sm transition-colors hover:bg-study-100 disabled:opacity-50"
      >
        Try sample quiz (3 questions)
      </button>
    </div>
  );
}

