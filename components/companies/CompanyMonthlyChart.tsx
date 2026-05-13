"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import type { Company } from "@/lib/seed/types";
import { ChartSkeleton } from "@/components/ui/Skeleton";

type Props = {
  company: Company | undefined;
  loading: boolean;
};

export function CompanyMonthlyChart({ company, loading }: Props) {
  const chartData = company
    ? [...new Set(company.emissions.map((e) => e.yearMonth))].sort().map((ym) => ({
        yearMonth: ym,
        total: company.emissions
          .filter((e) => e.yearMonth === ym)
          .reduce((s, e) => s + e.emissions, 0),
      }))
    : [];

  if (loading) return <ChartSkeleton />;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-6">
        월별 배출량
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="yearMonth"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            unit=" t"
          />
          <Tooltip
            contentStyle={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--text-muted)" }}
            itemStyle={{ color: "var(--text-primary)" }}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={i === chartData.length - 1 ? "#10b981" : "#1e3a5f"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}