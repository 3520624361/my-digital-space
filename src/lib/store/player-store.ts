"use client";

import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  isShuffled: boolean;
  repeatMode: "none" | "one" | "all";

  play: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  isShuffled: false,
  repeatMode: "none",

  play: (song) => {
    const { queue } = get();
    if (queue.length === 0) {
      set({ currentSong: song, queue: [song], isPlaying: true, progress: 0 });
    } else {
      set({ currentSong: song, isPlaying: true, progress: 0 });
    }
  },

  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),

  togglePlay: () => {
    const { isPlaying, currentSong } = get();
    if (currentSong) {
      set({ isPlaying: !isPlaying });
    }
  },

  next: () => {
    const { queue, currentSong, repeatMode } = get();
    if (queue.length === 0 || !currentSong) return;
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    let nextIndex: number;

    if (repeatMode === "one") {
      set({ progress: 0 });
      return;
    }

    if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (repeatMode === "all") {
      nextIndex = 0;
    } else {
      return;
    }

    set({ currentSong: queue[nextIndex], isPlaying: true, progress: 0 });
  },

  prev: () => {
    const { queue, currentSong, progress } = get();
    if (queue.length === 0 || !currentSong) return;
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);

    if (progress > 3) {
      set({ progress: 0 });
      return;
    }

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
    set({ currentSong: queue[prevIndex], isPlaying: true, progress: 0 });
  },

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setProgress: (progress) => set({ progress }),

  addToQueue: (song) => {
    const { queue } = get();
    if (!queue.find((s) => s.id === song.id)) {
      set({ queue: [...queue, song] });
    }
  },

  removeFromQueue: (songId) => {
    set({ queue: get().queue.filter((s) => s.id !== songId) });
  },

  clearQueue: () => set({ queue: [], currentSong: null, isPlaying: false }),

  toggleShuffle: () => set({ isShuffled: !get().isShuffled }),
  toggleRepeat: () => {
    const modes: PlayerState["repeatMode"][] = ["none", "one", "all"];
    const current = get().repeatMode;
    const nextIndex = (modes.indexOf(current) + 1) % modes.length;
    set({ repeatMode: modes[nextIndex] });
  },
}));
