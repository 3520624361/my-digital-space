"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Gift, Star, Sparkles, RefreshCw, Music, Bot, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function DailyPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleSignIn = () => {
    setSignedIn(true);
    setStreak((s) => s + 1);
    toast.success(`签到成功！连续签到 ${streak + 1} 天`, {
      icon: "🎉",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Sparkles className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">每日</h1>
        <p className="text-muted">每天都有新的发现和惊喜</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sign In Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Calendar className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="mb-2 text-xl font-bold">每日签到</h2>
            <p className="mb-2 text-sm text-muted">
              {signedIn ? "今日已签到" : "签到获取积分奖励"}
            </p>
            {streak > 0 && (
              <Badge variant="warning" className="mb-4">
                连续签到 {streak} 天
              </Badge>
            )}
            <Button
              onClick={handleSignIn}
              disabled={signedIn}
              variant={signedIn ? "outline" : "gradient"}
              size="lg"
              className="w-full gap-2"
            >
              <Gift className="h-5 w-5" />
              {signedIn ? "已签到" : "立即签到"}
            </Button>
          </div>
        </motion.div>

        {/* Daily Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card p-6">
            <h2 className="mb-4 text-xl font-bold">今日推荐</h2>
            <div className="space-y-4">
              {[
                { icon: Music, label: "推荐音乐", desc: "放松心情的音乐精选", color: "text-pink-500" },
                { icon: FileText, label: "推荐文章", desc: "精选技术文章推荐", color: "text-blue-500" },
                { icon: Bot, label: "推荐AI工具", desc: "每日AI工具推荐", color: "text-purple-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border border-card-border p-4 hover:bg-accent/5 transition-colors cursor-pointer">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10", item.color)}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Daily Wallpaper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">每日壁纸</h2>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                换一张
              </Button>
            </div>
            <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20">
              <div className="flex h-full flex-col items-center justify-center">
                <Star className="mb-2 h-8 w-8 text-accent" />
                <p className="text-muted">每日自动更新精美壁纸</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
