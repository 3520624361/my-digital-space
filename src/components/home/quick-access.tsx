"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Music, Gamepad2, BookOpen, ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/ai-center", icon: Bot, title: "AI 助手", description: "智能对话、写作、编程", color: "from-violet-500/20 to-purple-500/20" },
  { href: "/music", icon: Music, title: "音乐", description: "放松心情，享受音乐", color: "from-pink-500/20 to-rose-500/20" },
  { href: "/games", icon: Gamepad2, title: "游戏", description: "经典小游戏，随时畅玩", color: "from-amber-500/20 to-orange-500/20" },
  { href: "/knowledge-base", icon: BookOpen, title: "知识库", description: "文档管理、AI问答", color: "from-emerald-500/20 to-teal-500/20" },
];

export function QuickAccess() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">快捷入口</h2>
          <p className="mt-1 text-muted">探索平台的各个功能模块</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={link.href}>
                <div className="group relative overflow-hidden rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-50`} />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <link.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{link.title}</h3>
                    <p className="text-sm text-muted">{link.description}</p>
                    <div className="mt-4 flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      立即进入 <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
