export default function ResultsView({ questions, answers, onRestart, onRetry }) {
  const correctCount = answers.filter((a) => a.correct).length;
  const total = questions.length;
  const pct = total ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-study-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-study-500">
          Quiz complete
        </p>
        <p className="mt-2 font-display text-5xl font-bold text-study-800">{pct}%</p>
        <p className="mt-2 text-study-600">
          {correctCount} of {total} correct
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Retry quiz
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl border border-study-200 px-6 py-3 text-sm font-semibold text-study-700 hover:bg-study-100"
          >
            New material
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-study-800">Review</h2>
        {questions.map((q, i) => {
          const ans = answers.find((a) => a.questionIndex === i);
          const ok = ans && ans.correct;
          return (
            <details
              key={i}
              className="group rounded-xl border border-study-200 bg-white shadow-sm"
            >
              <summary className="cursor-pointer list-none px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      ok ? "bg-accent-light text-accent" : "bg-red-100 text-red-700"
                    }`}
                    aria-hidden
                  >
                    {ok ? "✓" : "✗"}
                  </span>
                  <span className="text-sm font-medium text-study-800">{q.question}</span>
                </div>
              </summary>
              <div className="border-t border-study-100 px-4 pb-4 pt-2 text-sm text-study-600 sm:px-5">
                <p>
                  <span className="font-medium text-study-800">Correct: </span>
                  {q.correctAnswer}
                </p>
                {ans && (
                  <p className="mt-1">
                    <span className="font-medium text-study-800">You chose: </span>
                    {ans.selected}
                  </p>
                )}
                <p className="mt-2">{q.correctExplanation}</p>
              </div>
            </details>
          );
        })}
      </section>
    </div>
  );
}

