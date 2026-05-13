type Variant = "default" | "success" | "warn" | "danger";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]",
  success: "bg-[var(--accent-dim)] text-[var(--accent)] border-[var(--accent)]",
  warn:    "bg-amber-950 text-amber-400 border-amber-800",
  danger:  "bg-[var(--danger-dim)] text-[var(--danger)] border-[var(--danger)]",
};

export function Badge({ children, variant = "default" }: Props) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}