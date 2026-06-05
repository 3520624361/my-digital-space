"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, FileText, Users, MessageCircle, Eye, BarChart3, Edit, Plus, Music } from "lucide-react";
import Link from "next/link";

interface Stats {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  totalViews: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statItems = [
    { icon: FileText, label: "文章", value: stats?.totalPosts ?? 0, color: "text-blue-500" },
    { icon: Users, label: "用户", value: stats?.totalUsers ?? 0, color: "text-emerald-500" },
    { icon: MessageCircle, label: "评论", value: stats?.totalComments ?? 0, color: "text-purple-500" },
    { icon: Eye, label: "浏览", value: stats?.totalViews ?? 0, color: "text-amber-500" },
  ];

  const quickActions = [
    { href: "/admin/posts", label: "文章管理", icon: Edit, desc: "管理所有文章" },
    { href: "/admin/categories", label: "分类管理", icon: BarChart3, desc: "管理文章分类" },
    { href: "/admin/songs", label: "音乐管理", icon: Music, desc: "管理歌曲和播放" },
    { href: "/admin/posts/new", label: "写文章", icon: Plus, desc: "创建新文章" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">管理后台</h1>
          <p className="text-muted">站点管理与内容维护</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-5"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className={`${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold">
                  {loading ? "..." : stat.value.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="mb-4 text-lg font-semibold">快捷操作</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Link href={action.href}>
                <div className="glass-card p-5 hover:border-accent/50 transition-all group">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors">{action.label}</h3>
                  <p className="text-sm text-muted">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
