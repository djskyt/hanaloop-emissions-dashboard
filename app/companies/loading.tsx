import { CardSkeleton } from "@/components/ui/Skeleton";

export default function CompaniesLoading() {
  return (
    <div className="p-8 space-y-8">
      <div className="h-8 w-48 bg-[var(--bg-elevated)] rounded animate-pulse" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}