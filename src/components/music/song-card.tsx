"use client";

import { Play, Music } from "lucide-react";
import { usePlayerStore } from "@/lib/store/player-store";
import { formatTime, cn } from "@/lib/utils";
import type { Song } from "@/types";

interface SongCardProps {
  song: Song;
  index?: number;
}

export function SongCard({ song, index }: SongCardProps) {
  const { play, currentSong } = usePlayerStore();
  const isActive = currentSong?.id === song.id;

  return (
    <button
      onClick={() => play(song)}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all hover:bg-accent/5",
        isActive && "bg-accent/10"
      )}
    >
      {/* Index or Play Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        {index !== undefined ? (
          <span className="text-sm text-muted group-hover:hidden">{index + 1}</span>
        ) : null}
        <Play className={cn(
          "h-4 w-4 text-accent",
          index !== undefined ? "hidden group-hover:block" : "block"
        )} />
      </div>

      {/* Cover */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-accent/10">
        {song.coverUrl ? (
          <img src={song.coverUrl} alt={song.title} className="h-full w-full object-cover" />
        ) : (
          <Music className="h-5 w-5 text-accent" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", isActive && "text-accent")}>
          {song.title}
        </p>
        <p className="truncate text-xs text-muted">{song.artist}</p>
      </div>

      {/* Duration */}
      <span className="text-xs text-muted">{formatTime(song.duration)}</span>
    </button>
  );
}
