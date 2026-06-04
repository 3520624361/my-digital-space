"use client";

import { motion } from "framer-motion";
import { Award, Lock, Sparkles, BookOpen, Music, Gamepad2, MessageCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "READING", label: "阅读", icon: BookOpen, color: "text-blue-500" },
  { id: "AI", label: "AI", icon: Sparkles, color: "text-purple-500" },
  { id: "MUSIC", label: "音乐", icon: Music, color: "text-pink-500" },
  { id: "GAME", label: "游戏", icon: Gamepad2, color: "text-emerald-500" },
  { id: "SOCIAL", label: "社交", icon: MessageCircle, color: "text-amber-500" },
  { id: "DAILY", label: "每日", icon: Calendar, color: "text-cyan-500" },
];

const achievements = [
  { key: "first-read", name: "初次阅读", desc: "阅读第一篇文章", icon: BookOpen, category: "READING", points: 10 },
  { key: "first-ai", name: "AI探索者", desc: "首次使用AI助手", icon: Sparkles, category: "AI", points: 10 },
  { key: "first-game", name: "游戏新手", desc: "完成第一次游戏", icon: Gamepad2, category: "GAME", points: 10 },
];

export default function AchievementsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 flex items-center gap-3">
          <Award className="h-6 w-6 text-accent" />
          <div>
            <h1 className="text-2xl font-bold">成就系统</h1>
            <p className="text-sm text-muted">完成挑战，解锁成就徽章</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "glass-card p-5 text-center transition-all",
                "opacity-50 grayscale"
              )}
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <Lock className="h-6 w-6 text-muted" />
              </div>
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="mt-1 text-sm text-muted">{achievement.desc}</p>
              <p className="mt-2 text-xs text-accent">+{achievement.points} 积分</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
