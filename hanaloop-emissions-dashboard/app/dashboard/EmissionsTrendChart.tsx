"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Company } from "@/lib/seed/types";

type Props = {
  companies: Company[];
};

// 회사별 월간 배출량 합산 데이터로 변환
function buildChartData(companies: Company[]) {
  const monthMap = new Map<string, Record<string, number>>();

  companies.forEach((company) => {
    company.emissions.forEach((e) => {
      if (!monthMap.has(e.yearMonth)) {
        monthMap.set(e.yearMonth, {});
      }
      const entry = monthMap.get(e.yearMonth)!;
      entry[company.name] = (entry[company.name] ?? 0) + e.emissions;
    });
  });

  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([yearMonth, values]) => ({ yearMonth, ...values }));
}

const LINE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#a855f7"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 text-xs space-y-1 shadow-xl">
      <p className="text-[var(--text-muted)] mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-[var(--text-secondary)]">{p.name}</span>
          </div>
          <span className="text-[var(--text-primary)] font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            {p.value.toFixed(1)} tCO₂e
          </span>
        </div>
      ))}
    </div>
  );
};

export function EmissionsTrendChart({ companies }: Props) {
  const data = buildChartData(companies);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-6">
        월별 배출량 트렌드
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
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
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "var(--text-secondary)" }}
          />
          {companies.map((company, i) => (
            <Line
              key={company.id}
              type="monotone"
              dataKey={company.name}
              stroke={LINE_COLORS[i % LINE_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3, fill: LINE_COLORS[i % LINE_COLORS.length] }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}