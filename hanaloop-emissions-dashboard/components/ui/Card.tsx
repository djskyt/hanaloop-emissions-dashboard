import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Card({ children, className = "", onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl border p-5
        bg-[var(--bg-surface)] border-[var(--border)]
        transition-all duration-200
        ${onClick ? "cursor-pointer hover:bg-[var(--bg-hover)] hover:border-[var(--accent)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}