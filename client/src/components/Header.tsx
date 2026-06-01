interface HeaderProps {
  onHome: () => void;
  showHome: boolean;
}

export default function Header({ onHome, showHome }: HeaderProps) {
  return (
    <header className="border-b border-study-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onHome}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <span className="font-display text-xl font-bold text-study-800 sm:text-2xl">
            Study Quiz
          </span>
          <span className="mt-0.5 block text-xs text-study-500 sm:text-sm">
            Learn · Practice · Review
          </span>
        </button>
        {showHome && (
          <button
            type="button"
            onClick={onHome}
            className="rounded-lg border border-study-200 px-3 py-1.5 text-sm font-medium text-study-600 transition-colors hover:bg-study-100"
          >
            New quiz
          </button>
        )}
      </div>
    </header>
  );
}
