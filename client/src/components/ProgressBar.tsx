interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-medium text-study-500">
        <span>
          {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-study-200"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
