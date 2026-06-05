"use client";

import { motion } from "framer-motion";
import { Music, Disc3, Search, Loader2, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { SongCard } from "@/components/music";
import { Input } from "@/components/ui/input";
import { MusicPlayer } from "@/components/music/music-player";
import type { Song } from "@/types";

export default function MusicPage() {
  const [tab, setTab] = useState<"local" | "solara">("local");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (tab === "local") {
      fetch("/api/music")
        .then((r) => r.json())
        .then((data) => {
          if (data.success) setSongs(data.data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [tab]);

  const filteredSongs = songs.filter(
    (s) => s.title.includes(search) || s.artist.includes(search)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Disc3 className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">音乐中心</h1>
        <p className="text-muted">放松心情，享受音乐</p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setTab("local")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "local"
              ? "bg-accent text-white shadow-lg shadow-accent/25"
              : "text-muted hover:text-foreground hover:bg-accent/10"
          }`}
        >
          <Music className="inline h-4 w-4 mr-1.5" />
          本地音乐
        </button>
        <button
          onClick={() => setTab("solara")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "solara"
              ? "bg-accent text-white shadow-lg shadow-accent/25"
              : "text-muted hover:text-foreground hover:bg-accent/10"
          }`}
        >
          <Globe className="inline h-4 w-4 mr-1.5" />
          在线搜索
        </button>
      </div>

      {/* Solara Tab */}
      {tab === "solara" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl overflow-hidden border border-card-border"
          style={{ height: "calc(100vh - 280px)", minHeight: 500 }}
        >
          <iframe
            src="/solara/index.html"
            className="w-full h-full border-0"
            title="Solara Music Player"
            allow="autoplay; fullscreen"
          />
        </motion.div>
      ) : (
        <>
          {/* Search */}
          <div className="mb-6">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索歌曲或歌手..."
              icon={<Search className="h-4 w-4" />}
              className="max-w-md mx-auto"
            />
          </div>

          {/* Song List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
          >
            <div className="border-b border-card-border px-4 py-3">
              <h2 className="font-semibold">热门歌曲</h2>
            </div>
            <div className="divide-y divide-card-border">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-muted">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : filteredSongs.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-muted">
                  <Music className="mb-2 h-8 w-8" />
                  <p>{search ? "暂无匹配的歌曲" : "暂无歌曲，去后台添加吧"}</p>
                </div>
              ) : (
                filteredSongs.map((song, index) => (
                  <SongCard key={song.id} song={song} index={index} />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}

      {/* Global Player */}
      <MusicPlayer />
    </div>
  );
}
