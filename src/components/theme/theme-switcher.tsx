"use client";

import { useTheme } from "next-themes";
import { useThemeStore } from "@/lib/store";
import { useMounted } from "@/hooks";
import type { ThemePreset } from "@/types";
import { Sun, Moon, Monitor } from "lucide-react";

const themes: { value: "light" | "dark" | "system"; icon: React.ReactNode; label: string }[] = [
  { value: "dark", icon: <Moon className="h-4 w-4" />, label: "深色" },
  { value: "light", icon: <Sun className="h-4 w-4" />, label: "浅色" },
  { value: "system", icon: <Monitor className="h-4 w-4" />, label: "系统" },
];

const presets: { value: ThemePreset; label: string }[] = [
  { value: "default", label: "默认" },
  { value: "cyberpunk", label: "赛博朋克" },
  { value: "ocean", label: "海洋" },
  { value: "purple-neon", label: "紫霓虹" },
];

export function ThemeSwitcher() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const { preset, setPreset } = useThemeStore();

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 rounded-lg border border-card-border p-1">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`rounded-md p-2 transition-colors ${
              theme === t.value
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground hover:bg-accent/10"
            }`}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-card-border p-1">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => setPreset(p.value)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              preset === p.value
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground hover:bg-accent/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
