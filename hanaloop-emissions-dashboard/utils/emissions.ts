import type { Company, GhgEmission, EmissionSource } from "@/lib/seed/types";

// 특정 회사의 전체 배출량 합산
export function getTotalEmissions(company: Company): number {
  return company.emissions.reduce((sum, e) => sum + e.emissions, 0);
}

// 특정 yearMonth 기준 배출량 합산
export function getEmissionsByMonth(
  company: Company,
  yearMonth: string
): number {
  return company.emissions
    .filter((e) => e.yearMonth === yearMonth)
    .reduce((sum, e) => sum + e.emissions, 0);
}

// 회사 목록에서 월별 전체 배출량 집계
// 차트용 { yearMonth, total } 배열 반환
export function aggregateByMonth(
  companies: Company[]
): { yearMonth: string; total: number }[] {
  const map = new Map<string, number>();

  companies.forEach((company) => {
    company.emissions.forEach((e) => {
      map.set(e.yearMonth, (map.get(e.yearMonth) ?? 0) + e.emissions);
    });
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([yearMonth, total]) => ({ yearMonth, total }));
}

// 회사 목록에서 source별 전체 배출량 집계
// 차트용 { source, total } 배열 반환
export function aggregateBySource(
  companies: Company[]
): { source: EmissionSource; total: number }[] {
  const map = new Map<EmissionSource, number>();

  companies.forEach((company) => {
    company.emissions.forEach((e) => {
      map.set(e.source, (map.get(e.source) ?? 0) + e.emissions);
    });
  });

  return Array.from(map.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([source, total]) => ({ source, total }));
}

// 국가별 전체 배출량 집계
// 차트용 { country, total } 배열 반환
export function aggregateByCountry(
  companies: Company[]
): { country: string; total: number }[] {
  const map = new Map<string, number>();

  companies.forEach((company) => {
    const total = getTotalEmissions(company);
    map.set(company.country, (map.get(company.country) ?? 0) + total);
  });

  return Array.from(map.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([country, total]) => ({ country, total }));
}

// 전월 대비 증감률 계산
export function getMonthOverMonthChange(
  emissions: GhgEmission[],
  currentMonth: string
): number | null {
  const months = [...new Set(emissions.map((e) => e.yearMonth))].sort();
  const currentIndex = months.indexOf(currentMonth);
  if (currentIndex <= 0) return null;

  const prevMonth = months[currentIndex - 1];

  const current = emissions
    .filter((e) => e.yearMonth === currentMonth)
    .reduce((sum, e) => sum + e.emissions, 0);

  const prev = emissions
    .filter((e) => e.yearMonth === prevMonth)
    .reduce((sum, e) => sum + e.emissions, 0);

  if (prev === 0) return null;
  return ((current - prev) / prev) * 100;
}

// source 라벨 한글화 (UI 표시용)
export const SOURCE_LABELS: Record<EmissionSource, string> = {
  gasoline:    "휘발유",
  diesel:      "경유",
  lpg:         "LPG",
  electricity: "전기",
  natural_gas: "천연가스",
  coal:        "석탄",
};

// source별 색상 (차트용)
export const SOURCE_COLORS: Record<EmissionSource, string> = {
  gasoline:    "#f97316",
  diesel:      "#84cc16",
  lpg:         "#a855f7",
  electricity: "#3b82f6",
  natural_gas: "#f59e0b",
  coal:        "#6b7280",
};