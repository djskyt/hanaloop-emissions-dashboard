"use client";

import { useCompanies } from "@/hooks/useCompanies";
import { useCountries } from "@/hooks/useCountries";
import { useUiStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { getTotalEmissions } from "@/utils/emissions";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Badge } from "@/components/ui/Badge";

export default function CompaniesPage() {
  const router = useRouter();
  const { data: companies, loading, error } = useCompanies();
  const { data: countries } = useCountries();
  const { selectedCountry, setSelectedCountry } = useUiStore();

  const filtered = selectedCountry
    ? companies.filter((c) => c.country === selectedCountry)
    : companies;

  const getCountryName = (code: string) =>
    countries.find((c) => c.code === code)?.name ?? code;

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">회사 목록</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            전체 {filtered.length}개 회사
          </p>
        </div>

        {/* 국가 필터 */}
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
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                selectedCountry === country.code
                  ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent-dim)]"
                  : "text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
            >
              {country.code}
            </button>
          ))}
        </div>
      </div>

      {/* 회사 카드 목록 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : filtered.map((company) => {
              const total = getTotalEmissions(company);
              const max = Math.max(...companies.map(getTotalEmissions));
              const isTop = total === max;

              return (
                <div
                  key={company.id}
                  onClick={() => router.push(`/companies/${company.id}`)}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 cursor-pointer hover:border-[var(--accent)] hover:bg-[var(--bg-hover)] transition-all duration-200 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {company.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {getCountryName(company.country)}
                      </p>
                    </div>
                    {isTop && (
                      <Badge variant="danger">최고 배출</Badge>
                    )}
                  </div>

                  {/* 배출량 바 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[var(--text-muted)]">
                      <span>총 배출량</span>
                      <span
                        className="text-[var(--text-primary)] font-medium"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {total.toFixed(1)} tCO₂e
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(total / max) * 100}%`,
                          backgroundColor: isTop ? "#ef4444" : "#10b981",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}