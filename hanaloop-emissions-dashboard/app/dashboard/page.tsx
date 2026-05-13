"use client";

import { useCompanies } from "@/hooks/useCompanies";
import { useUiStore } from "@/store/uiStore";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { EmissionsTrendChart } from "@/components/dashboard/EmissionsTrendChart";
import { EmissionsBySourceChart } from "@/components/dashboard/EmissionsBySourceChart";
import { EmissionsByCountryChart } from "@/components/dashboard/EmissionsByCountryChart";
import { CardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import {
  getTotalEmissions,
  aggregateByMonth,
  getMonthOverMonthChange,
} from "@/utils/emissions";
import type { Company } from "@/lib/seed/types";

function getTopEmitter(companies: Company[]): Company | null {
  if (!companies.length) return null;
  return companies.reduce((a, b) =>
    getTotalEmissions(a) > getTotalEmissions(b) ? a : b
  );
}

function getLatestMonth(companies: Company[]): string | null {
  const months = companies
    .flatMap((c) => c.emissions.map((e) => e.yearMonth))
    .sort();
  return months[months.length - 1] ?? null;
}

export default function DashboardPage() {
  const { data: companies, loading, error } = useCompanies();
  const { selectedCountry } = useUiStore();

  const filtered = selectedCountry
    ? companies.filter((c) => c.country === selectedCountry)
    : companies;

  const totalEmissions = filtered.reduce(
    (sum, c) => sum + getTotalEmissions(c),
    0
  );

  const latestMonth = getLatestMonth(filtered);
  const monthlyData = aggregateByMonth(filtered);
  const momChange = latestMonth
    ? getMonthOverMonthChange(
        filtered.flatMap((c) => c.emissions),
        latestMonth
      )
    : null;

  const topEmitter = getTopEmitter(filtered);
  const topEmitterTotal = topEmitter ? getTotalEmissions(topEmitter) : 0;

  if (error) {
    return (
      <div className="p-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            탄소 배출량 대시보드
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {latestMonth ?? "-"} 기준 · 전체 {filtered.length}개 회사
          </p>
        </div>

        {/* 국가 필터 */}
        <CountryFilter companies={companies} />
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <KpiCard
              title="총 배출량"
              value={totalEmissions.toFixed(1)}
              unit="tCO₂e"
              change={momChange}
              description="전월 대비"
            />
            <KpiCard
              title="모니터링 회사 수"
              value={String(filtered.length)}
              unit="개사"
              description="전체 등록 회사"
            />
            <KpiCard
              title="최고 배출 회사"
              value={topEmitter?.name ?? "-"}
              description={`${topEmitterTotal.toFixed(1)} tCO₂e`}
            />
            <KpiCard
              title="월평균 배출량"
              value={
                monthlyData.length
                  ? (totalEmissions / monthlyData.length).toFixed(1)
                  : "0"
              }
              unit="tCO₂e"
              description="전체 기간 평균"
            />
          </>
        )}
      </div>

      {/* 트렌드 차트 */}
      {loading ? (
        <ChartSkeleton />
      ) : (
        <EmissionsTrendChart companies={filtered} />
      )}

      {/* 파이 + 바 차트 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <EmissionsBySourceChart companies={filtered} />
            <EmissionsByCountryChart companies={filtered} />
          </>
        )}
      </div>
    </div>
  );
}

// 국가 필터 컴포넌트
function CountryFilter({ companies }: { companies: Company[] }) {
  const { selectedCountry, setSelectedCountry } = useUiStore();
  const countries = [...new Set(companies.map((c) => c.country))];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSelectedCountry(null)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
          selectedCountry === null
            ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent-dim)]"
            : "text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
        }`}
      >
        전체
      </button>
      {countries.map((code) => (
        <button
          key={code}
          onClick={() => setSelectedCountry(code)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            selectedCountry === code
              ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent-dim)]"
              : "text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}