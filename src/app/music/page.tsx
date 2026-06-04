"use client";

import { motion } from "framer-motion";
import { Music, Disc3, Search } from "lucide-react";
import { useState } from "react";
import { SongCard } from "@/components/music";
import { Input } from "@/components/ui/input";
import { MusicPlayer } from "@/components/music/music-player";
import type { Song } from "@/types";

const mockSongs: Song[] = [
  { id: "1", title: "起风了", artist: "买辣椒也用券", album: "起风了", duration: 325, audioUrl: "#", playCount: 99999, coverUrl: null, lyrics: null },
  { id: "2", title: "孤勇者", artist: "陈奕迅", album: "孤勇者", duration: 268, audioUrl: "#", playCount: 88888, coverUrl: null, lyrics: null },
  { id: "3", title: "光年之外", artist: "邓紫棋", album: "光年之外", duration: 244, audioUrl: "#", playCount: 77777, coverUrl: null, lyrics: null },
  { id: "4", title: "童话", artist: "光良", album: "童话", duration: 248, audioUrl: "#", playCount: 66666, coverUrl: null, lyrics: null },
  { id: "5", title: "夜曲", artist: "周杰伦", album: "十一月的萧邦", duration: 226, audioUrl: "#", playCount: 55555, coverUrl: null, lyrics: null },
];

export default function MusicPage() {
  const [search, setSearch] = useState("");

  const filteredSongs = mockSongs.filter(
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
          {filteredSongs.map((song, index) => (
            <SongCard key={song.id} song={song} index={index} />
          ))}
        </div>
        {filteredSongs.length === 0 && (
          <div className="flex flex-col items-center py-10 text-muted">
            <Music className="mb-2 h-8 w-8" />
            <p>暂无匹配的歌曲</p>
          </div>
        )}
      </motion.div>

      {/* Global Player */}
      <MusicPlayer />
    </div>
  );
}
