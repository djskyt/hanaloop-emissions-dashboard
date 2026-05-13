type Props = {
  title: string;
  value: string;
  unit?: string;
  change?: number | null;  // 전월 대비 증감률
  description?: string;
};

export function KpiCard({ title, value, unit, change, description }: Props) {
  const isPositive = change !== null && change !== undefined && change > 0;
  const isNegative = change !== null && change !== undefined && change < 0;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 flex flex-col gap-3">
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest">
        {title}
      </p>

      <div className="flex items-end gap-2">
        <span
          className="text-3xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm text-[var(--text-muted)] mb-1">{unit}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {change !== null && change !== undefined && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
              isNegative
                ? "text-[var(--accent)] bg-[var(--accent-glow)] border-[var(--accent-dim)]"
                : isPositive
                ? "text-[var(--danger)] bg-[var(--danger-dim)] border-[var(--danger)]"
                : "text-[var(--text-muted)] bg-[var(--bg-elevated)] border-[var(--border)]"
            }`}
          >
            {isPositive ? "▲" : isNegative ? "▼" : "–"}{" "}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
        {description && (
          <span className="text-xs text-[var(--text-muted)]">{description}</span>
        )}
      </div>
    </div>
  );
}