import { CardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-8 space-y-8">
      <div className="h-8 w-48 bg-[var(--bg-elevated)] rounded animate-pulse" />
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <ChartSkeleton />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}