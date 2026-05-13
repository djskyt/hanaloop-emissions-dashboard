import type { Metadata } from "next";
import "./globals.css";
import { NavDrawer } from "@/components/layout/NavDrawer";

export const metadata: Metadata = {
  title: "HanaLoop Emissions Dashboard",
  description: "Carbon emissions monitoring for executives and managers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
        <NavDrawer />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}