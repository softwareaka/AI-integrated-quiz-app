import { useCallback, useEffect, useState } from "react";
import { checkHealth, extractFromPdf, extractFromText, loadSampleQuiz } from "./api.js";
import Header from "./components/Header.jsx";
import HomeView from "./components/HomeView.jsx";
import QuizView from "./components/QuizView.jsx";
import ResultsView from "./components/ResultsView.jsx";

export default function App() {
  const [view, setView] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [aiConfigured, setAiConfigured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth()
      .then((h) => setAiConfigured(Boolean(h.aiConfigured)))
      .catch(() => setAiConfigured(false));
  }, []);

  const startQuiz = useCallback((qs) => {
    setQuestions(qs);
    setAnswers([]);
    setError(null);
    setView("quiz");
  }, []);

  const handleSample = async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = await loadSampleQuiz();
      startQuiz(qs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load sample.");
    } finally {
      setLoading(false);
    }
  };

  const handlePdf = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const qs = await extractFromPdf(file);
      startQuiz(qs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF extraction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleText = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const qs = await extractFromText(text);
      startQuiz(qs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Text extraction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (records) => {
    setAnswers(records);
    setView("results");
  };

  const handleRestart = () => {
    setView("home");
    setQuestions([]);
    setAnswers([]);
    setError(null);
  };

  const handleRetry = () => {
    setAnswers([]);
    setView("quiz");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onHome={handleRestart} showHome={view !== "home"} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {view === "home" && (
          <HomeView
            aiConfigured={aiConfigured}
            loading={loading}
            error={error}
            onSample={handleSample}
            onPdf={handlePdf}
            onText={handleText}
          />
        )}
        {view === "quiz" && questions.length > 0 && (
          <QuizView questions={questions} onFinish={handleFinish} />
        )}
        {view === "results" && (
          <ResultsView
            questions={questions}
            answers={answers}
            onRestart={handleRestart}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  );
}

