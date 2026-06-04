"use client";

import { usePlayerStore } from "@/lib/store/player-store";
import { formatTime } from "@/lib/utils";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, ListMusic } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function MusicPlayer() {
  const {
    currentSong, isPlaying, volume, progress, isShuffled, repeatMode,
    togglePlay, next, prev, setVolume, setProgress, toggleShuffle, toggleRepeat,
  } = usePlayerStore();

  if (!currentSong) return null;

  const repeatIcons: Record<string, string> = { none: "off", one: "1", all: "all" };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-card-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Song Info */}
        <div className="flex w-60 items-center gap-3">
          <Avatar
            size="md"
            fallback={currentSong.title[0]}
            className="rounded-lg"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{currentSong.title}</p>
            <p className="truncate text-xs text-muted">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button onClick={toggleShuffle} className={`p-1.5 transition-colors ${isShuffled ? 'text-accent' : 'text-muted hover:text-foreground'}`}>
              <Shuffle className="h-4 w-4" />
            </button>
            <button onClick={prev} className="p-1.5 text-muted hover:text-foreground transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button onClick={next} className="p-1.5 text-muted hover:text-foreground transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
            <button onClick={toggleRepeat} className={`p-1.5 transition-colors ${repeatMode !== 'none' ? 'text-accent' : 'text-muted hover:text-foreground'}`}>
              <Repeat className="h-4 w-4" />
              {repeatMode !== 'none' && (
                <span className="absolute text-[8px] font-bold">{repeatMode === 'one' ? '1' : ''}</span>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="w-10 text-right text-xs tabular-nums text-muted">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={currentSong.duration || 100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-surface-700 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
            />
            <span className="w-10 text-left text-xs tabular-nums text-muted">
              {formatTime(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex w-40 items-center justify-end gap-2">
          <button onClick={() => setVolume(volume === 0 ? 0.7 : 0)} className="text-muted hover:text-foreground transition-colors">
            {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-surface-700 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
