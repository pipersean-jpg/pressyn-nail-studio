import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCartSync } from "@/hooks/useCartSync";

export function Layout({ children }: { children: ReactNode }) {
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}