"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemePreset } from "@/types";

interface ThemeState {
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preset: "default",
      setPreset: (preset) => set({ preset }),
    }),
    { name: "theme-preset" }
  )
);
