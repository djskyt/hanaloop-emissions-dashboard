"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Company } from "@/lib/seed/types";
import { aggregateBySource, SOURCE_LABELS, SOURCE_COLORS } from "@/utils/emissions";

type Props = {
  companies: Company[];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 text-xs shadow-xl">
      <p className="text-[var(--text-secondary)]">{name}</p>
      <p
        className="text-[var(--text-primary)] font-medium mt-1"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {value.toFixed(1)} tCO₂e
      </p>
    </div>
  );
};

export function EmissionsBySourceChart({ companies }: Props) {
  const data = aggregateBySource(companies).map((d) => ({
    name: SOURCE_LABELS[d.source],
    value: d.total,
    color: SOURCE_COLORS[d.source],
  }));

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-6">
        배출원별 비중
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "var(--text-secondary)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}