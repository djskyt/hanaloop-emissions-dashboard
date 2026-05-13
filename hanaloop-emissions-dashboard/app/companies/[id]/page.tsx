"use client";

import { useCompanies } from "@/hooks/useCompanies";
import { usePosts } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";
import { CompanyKpiCards } from "@/components/companies/CompanyKpiCards";
import { CompanyMonthlyChart } from "@/components/companies/CompanyMonthlyChart";
import { PostList } from "@/components/companies/PostList";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";

const COUNTRY_NAMES: Record<string, string> = {
  US: "미국", DE: "독일", KR: "한국", JP: "일본",
};

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: companies, loading: cLoading, error: cError } = useCompanies();
  const { data: posts, loading: pLoading, error: pError, savePost, removePost } = usePosts();

  const company = companies.find((c) => c.id === id);
  const companyPosts = posts.filter((p) => p.resourceUid === id);

  const latestMonth = company
    ? [...new Set(company.emissions.map((e) => e.yearMonth))].sort().at(-1) ?? ""
    : "";

  if (cError) {
    return (
      <div className="p-8">
        <ErrorMessage message={cError} />
      </div>
    );
  }

  if (!cLoading && !company) {
    return (
      <div className="p-8 space-y-4">
        <p className="text-[var(--text-muted)]">회사를 찾을 수 없습니다.</p>
        <Button variant="ghost" onClick={() => router.push("/companies")}>
          ← 목록으로
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* 헤더 */}
      <div>
        <button
          onClick={() => router.push("/companies")}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] mb-2 flex items-center gap-1 transition-colors"
        >
          ← 회사 목록
        </button>
        {cLoading ? (
          <div className="h-8 w-48 bg-[var(--bg-elevated)] rounded animate-pulse" />
        ) : (
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {company?.name}
          </h1>
        )}
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {company ? (COUNTRY_NAMES[company.country] ?? company.country) : ""}
        </p>
      </div>

      {/* KPI 카드 */}
      <CompanyKpiCards
        company={company}
        loading={cLoading}
        postCount={companyPosts.length}
      />

      {/* 월별 차트 */}
      <CompanyMonthlyChart company={company} loading={cLoading} />

      {/* 포스트 */}
      <PostList
        companyId={id}
        latestMonth={latestMonth}
        posts={companyPosts}
        loading={pLoading}
        error={pError}
        onSave={savePost}
        onDelete={removePost}
      />
    </div>
  );
}