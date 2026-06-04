"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/lib/store";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { preset } = useThemeStore();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <div className={preset !== "default" ? `theme-${preset}` : ""}>
        {children}
      </div>
    </NextThemesProvider>
  );
}
