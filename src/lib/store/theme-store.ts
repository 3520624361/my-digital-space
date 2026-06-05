"use client";

import { create } from "zustand";
import type { ThemePreset } from "@/types";

interface ThemeState {
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
}

export const useThemeStore = create<ThemeState>()((set) => ({
  preset: "default",
  setPreset: (preset) => set({ preset }),
}));
