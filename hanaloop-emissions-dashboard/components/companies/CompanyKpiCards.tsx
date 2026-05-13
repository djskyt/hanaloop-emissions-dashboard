"use client";

import type { Company } from "@/lib/seed/types";
import { getTotalEmissions, getMonthOverMonthChange } from "@/utils/emissions";
import { CardSkeleton } from "@/components/ui/Skeleton";

type Props = {
  company: Company | undefined;
  loading: boolean;
  postCount: number;
};

export function CompanyKpiCards({ company, loading, postCount }: Props) {
  const chartData = company
    ? [...new Set(company.emissions.map((e) => e.yearMonth))].sort()
    : [];
  const latestMonth = chartData[chartData.length - 1] ?? null;
  const momChange =
    company && latestMonth
      ? getMonthOverMonthChange(company.emissions, latestMonth)
      : null;

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">총 배출량</p>
        <p className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}>
          {company ? getTotalEmissions(company).toFixed(1) : "-"}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">tCO₂e</p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">전월 대비</p>
        <p
          className={`text-3xl font-bold ${
            momChange === null
              ? "text-[var(--text-muted)]"
              : momChange > 0
              ? "text-[var(--danger)]"
              : "text-[var(--accent)]"
          }`}
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {momChange === null
            ? "-"
            : `${momChange > 0 ? "▲" : "▼"} ${Math.abs(momChange).toFixed(1)}%`}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">{latestMonth} 기준</p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">포스트 수</p>
        <p className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}>
          {postCount}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">등록된 포스트</p>
      </div>
    </div>
  );
}