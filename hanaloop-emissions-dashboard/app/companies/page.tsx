"use client";

import { useCompanies } from "@/hooks/useCompanies";
import { useUiStore } from "@/store/uiStore";
import { getTotalEmissions } from "@/utils/emissions";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";

const COUNTRY_NAMES: Record<string, string> = {
  US: "미국",
  DE: "독일",
  KR: "한국",
  JP: "일본",
};

export default function CompaniesPage() {
  const { data: companies, loading, error } = useCompanies();
  const { selectedCountry, setSelectedCountry } = useUiStore();
  const router = useRouter();

  const filtered = selectedCountry
    ? companies.filter((c) => c.country === selectedCountry)
    : companies;

  const countries = [...new Set(companies.map((c) => c.country))];

  const maxEmissions = Math.max(...filtered.map((c) => getTotalEmissions(c)));

  return (
    <div className="p-8 space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">회사 목록</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          회사를 클릭하면 상세 배출량과 포스트를 확인할 수 있습니다
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
            {COUNTRY_NAMES[code] ?? code}
          </button>
        ))}
      </div>

      {/* 에러 */}
      {error && <ErrorMessage message={error} />}

      {/* 테이블 */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] text-xs uppercase tracking-widest">
              <th className="text-left px-6 py-4 font-medium">회사명</th>
              <th className="text-left px-6 py-4 font-medium">국가</th>
              <th className="text-left px-6 py-4 font-medium">총 배출량</th>
              <th className="text-left px-6 py-4 font-medium">배출 비중</th>
              <th className="text-left px-6 py-4 font-medium">상태</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]">
                    <td colSpan={5} className="px-6 py-4">
                      <CardSkeleton />
                    </td>
                  </tr>
                ))
              : filtered.map((company) => {
                  const total = getTotalEmissions(company);
                  const ratio = maxEmissions > 0 ? (total / maxEmissions) * 100 : 0;
                  const isTop = total === maxEmissions;

                  return (
                    <tr
                      key={company.id}
                      onClick={() => router.push(`/companies/${company.id}`)}
                      className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                        {company.name}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">
                        {COUNTRY_NAMES[company.country] ?? company.country}
                      </td>
                      <td
                        className="px-6 py-4 text-[var(--text-primary)] font-medium"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {total.toFixed(1)} tCO₂e
                      </td>
                      <td className="px-6 py-4 w-48">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-elevated)]">
                            <div
                              className="h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${ratio}%`,
                                backgroundColor: isTop ? "var(--danger)" : "var(--accent)",
                              }}
                            />
                          </div>
                          <span className="text-xs text-[var(--text-muted)] w-10 text-right">
                            {ratio.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={isTop ? "danger" : "success"}>
                          {isTop ? "최고 배출" : "정상"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}