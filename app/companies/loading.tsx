export default function CompaniesLoading() {
  return (
    <div className="p-8 space-y-8">
      <div className="h-8 w-48 bg-[#1a2236] rounded animate-pulse" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-[#1e3a5f] bg-[#111827] p-5 space-y-3">
            <div className="h-4 w-1/3 rounded-lg bg-[#1a2236] animate-pulse" />
            <div className="h-8 w-1/2 rounded-lg bg-[#1a2236] animate-pulse" />
            <div className="h-3 w-2/3 rounded-lg bg-[#1a2236] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}