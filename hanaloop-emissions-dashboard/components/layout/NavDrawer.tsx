"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/uiStore";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard",  icon: "▦", label: "대시보드"  },
  { href: "/companies",  icon: "⬡", label: "회사 목록" },
  { href: "/posts",      icon: "☰", label: "포스트"    },
  { href: "/guide",      icon: "◎", label: "탄소 회계 가이드" },
];

export function NavDrawer() {
  const pathname = usePathname();
  const { isDrawerOpen, toggleDrawer } = useUiStore();

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 border-r border-[var(--border)] bg-[var(--bg-surface)]"
      style={{ width: isDrawerOpen ? "220px" : "60px" }}
    >
      {/* 로고 + 토글 */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[var(--border)]">
        {isDrawerOpen && (
          <span className="text-[var(--accent)] font-bold text-sm tracking-widest uppercase">
            HanaLoop
          </span>
        )}
        <button
          onClick={toggleDrawer}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-auto"
        >
          {isDrawerOpen ? "←" : "→"}
        </button>
      </div>

      {/* 네비 아이템 */}
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                transition-all duration-150
                ${isActive
                  ? "bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-dim)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                }
              `}
            >
              <span className="text-base w-5 text-center flex-shrink-0">
                {item.icon}
              </span>
              {isDrawerOpen && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 하단 버전 */}
      {isDrawerOpen && (
        <div className="px-4 py-3 border-t border-[var(--border)]">
          <p className="text-[var(--text-muted)] text-xs">
            Emissions Dashboard v1.0
          </p>
        </div>
      )}
    </aside>
  );
}