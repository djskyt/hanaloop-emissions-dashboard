type Props = {
  message: string;
  onRetry?: () => void;
};

export function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="rounded-xl border border-[var(--danger)] bg-[var(--danger-dim)] p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-[var(--danger)] text-sm">
        <span>⚠</span>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-[var(--danger)] underline hover:opacity-80"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}