import { useState } from "react";
import type { AnswerRecord } from "../App";
import type { QuizQuestion } from "../types";
import ProgressBar from "./ProgressBar";

interface QuizViewProps {
  questions: QuizQuestion[];
  onFinish: (records: AnswerRecord[]) => void;
}

export default function QuizView({ questions, onFinish }: QuizViewProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [, setRecords] = useState<AnswerRecord[]>([]);

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = selected === q.correctAnswer;

  const handleCheck = () => {
    if (!selected) return;
    setRevealed(true);
    setRecords((prev) => [
      ...prev,
      { questionIndex: index, selected, correct: selected === q.correctAnswer },
    ]);
  };

  const handleNext = () => {
    if (isLast) {
      setRecords((prev) => {
        const final =
          prev.some((r) => r.questionIndex === index) || !selected
            ? prev
            : [
                ...prev,
                {
                  questionIndex: index,
                  selected,
                  correct: selected === q.correctAnswer,
                },
              ];
        onFinish(final);
        return final;
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  const getOptionClass = (opt: string) => {
    const base =
      "w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-default";

    if (!revealed) {
      return `${base} ${
        selected === opt
          ? "border-accent bg-accent-light text-study-900"
          : "border-study-200 bg-white hover:border-study-300"
      }`;
    }

    if (opt === q.correctAnswer) {
      return `${base} border-accent bg-accent-light text-study-900 animate-correct-pulse`;
    }
    if (opt === selected) {
      return `${base} border-red-300 bg-red-50 text-red-900`;
    }
    return `${base} border-study-100 bg-study-50 text-study-500 opacity-80`;
  };

  return (
    <div className="space-y-6">
      <ProgressBar current={index + 1} total={questions.length} />

      <article className="rounded-2xl border border-study-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-study-500">
          Question {index + 1}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-study-800 sm:text-2xl">
          {q.question}
        </h2>

        <ul className="mt-6 space-y-3" role="listbox" aria-label="Answer options">
          {q.options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={selected === opt}
                disabled={revealed}
                onClick={() => setSelected(opt)}
                className={getOptionClass(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>

        {revealed && (
          <div className="mt-6 space-y-3 rounded-xl bg-study-50 p-4 text-sm leading-relaxed">
            <p
              className={`font-semibold ${isCorrect ? "text-accent" : "text-red-700"}`}
            >
              {isCorrect ? "Correct!" : "Not quite — see below."}
            </p>
            <p className="text-study-700">
              <span className="font-medium text-study-800">Why correct: </span>
              {q.correctExplanation}
            </p>
            {!isCorrect && selected && q.incorrectExplanations[selected] && (
              <p className="text-study-600">
                <span className="font-medium text-study-800">Your choice: </span>
                {q.incorrectExplanations[selected]}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {!revealed ? (
            <button
              type="button"
              disabled={!selected}
              onClick={handleCheck}
              className="rounded-xl bg-study-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-study-700 disabled:opacity-50"
            >
              Check answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              {isLast ? "See results" : "Next question"}
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
