"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <p className="text-[var(--danger)] text-lg font-semibold">
        대시보드를 불러오지 못했습니다
      </p>
      <p className="text-sm text-[var(--text-muted)]">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-dim)] text-sm hover:opacity-80 transition-opacity"
      >
        다시 시도
      </button>
    </div>
  );
}