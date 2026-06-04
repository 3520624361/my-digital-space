"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Gamepad2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const games = [
  { id: "snake", name: "贪吃蛇", color: "text-emerald-500" },
  { id: "2048", name: "2048", color: "text-amber-500" },
  { id: "tetris", name: "俄罗斯方块", color: "text-blue-500" },
  { id: "space-invaders", name: "飞机大战", color: "text-purple-500" },
] as const;

const periods = [
  { id: "today", label: "今日榜" },
  { id: "week", label: "周榜" },
  { id: "month", label: "月榜" },
  { id: "all", label: "总榜" },
] as const;

const rankStyles = [
  "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]",
  "text-gray-300 drop-shadow-[0_0_6px_rgba(156,163,175,0.3)]",
  "text-amber-700 drop-shadow-[0_0_6px_rgba(180,83,9,0.3)]",
];

export default function LeaderboardPage() {
  const [activeGame, setActiveGame] = useState("snake");
  const [activePeriod, setActivePeriod] = useState("all");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Trophy className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">排行榜</h1>
        <p className="text-muted">查看各游戏的高分纪录和排名</p>
      </motion.div>

      {/* Game Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeGame === game.id
                ? "bg-accent text-white shadow-lg"
                : "text-muted hover:text-foreground hover:bg-accent/10 border border-card-border"
            )}
          >
            <Gamepad2 className="h-4 w-4" />
            {game.name}
          </button>
        ))}
      </div>

      {/* Period Tabs */}
      <div className="mb-8 flex justify-center gap-2">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setActivePeriod(period.id)}
            className={cn(
              "rounded-lg px-4 py-1.5 text-xs font-medium transition-all",
              activePeriod === period.id
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-muted hover:text-foreground"
            )}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Leaderboard List */}
      <motion.div
        key={`${activeGame}-${activePeriod}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        {/* Empty State */}
        <div className="glass-card p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Trophy className="h-8 w-8 text-accent" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">暂无排行榜数据</h3>
          <p className="text-sm text-muted">还没有人参与这个游戏，快来成为第一名吧！</p>
        </div>
      </motion.div>
    </div>
  );
}
