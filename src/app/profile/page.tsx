"use client";

import { motion } from "framer-motion";
import { User, Settings, Bookmark, MessageCircle, Trophy, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tabs = [
  { id: "overview", label: "概览", icon: User },
  { id: "favorites", label: "收藏", icon: Bookmark, href: "/profile/favorites" },
  { id: "comments", label: "评论", icon: MessageCircle },
  { id: "achievements", label: "成就", icon: Award, href: "/profile/achievements" },
  { id: "settings", label: "设置", icon: Settings, href: "/profile/settings" },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-8 overflow-hidden"
      >
        <div className="h-32 gradient-bg" />
        <div className="relative px-6 pb-6">
          <div className="-mt-12 mb-4">
            <Avatar size="xl" fallback="访" className="ring-4 ring-background" />
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">访客</h1>
              <p className="text-muted">欢迎来到 My Digital Space</p>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-accent" />
                  0 积分
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-accent" />
                  Lv.1
                </span>
              </div>
            </div>
            <Link href="/profile/settings">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                编辑资料
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href || "#"}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              tab.id === "overview"
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground hover:bg-accent/10 border border-card-border"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Profile Content Placeholder */}
      <div className="glass-card p-8">
        <h2 className="mb-4 text-lg font-semibold">个人概览</h2>
        <div className="space-y-6 text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted" />
          <p className="text-muted">登录后查看完整个人资料</p>
          <Link href="/auth">
            <Button variant="gradient">登录 / 注册</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
