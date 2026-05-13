"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Company } from "@/lib/seed/types";
import { aggregateByCountry } from "@/utils/emissions";

type Props = {
  companies: Company[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 text-xs shadow-xl">
      <p className="text-[var(--text-muted)] mb-1">{label}</p>
      <p
        className="text-[var(--text-primary)] font-medium"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {payload[0].value.toFixed(1)} tCO₂e
      </p>
    </div>
  );
};

export function EmissionsByCountryChart({ companies }: Props) {
  const data = aggregateByCountry(companies);
  const max = Math.max(...data.map((d) => d.total));

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-6">
        국가별 총 배출량
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="country"
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-hover)" }} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.total === max ? "#10b981" : "#1e3a5f"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}