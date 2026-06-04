"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AITypeCard } from "@/components/ai";
import { Button } from "@/components/ui/button";

const assistants = [
  { id: "chat", name: "AI 聊天助手", description: "日常对话、问答、闲聊", icon: "MessageCircle" },
  { id: "writing", name: "AI 写作助手", description: "文章创作、文案优化、内容生成", icon: "Pencil" },
  { id: "code", name: "AI 代码助手", description: "代码编写、调试、优化", icon: "Code" },
  { id: "translate", name: "AI 翻译助手", description: "多语言翻译、本地化", icon: "Languages" },
  { id: "summary", name: "AI 文章总结", description: "快速总结文章要点", icon: "FileText" },
  { id: "study", name: "AI 学习助手", description: "知识讲解、学习规划", icon: "GraduationCap" },
];

export default function AICenterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Sparkles className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">AI 中心</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          多种AI助手，帮你写作、编程、翻译、学习，释放你的创造力
        </p>
      </motion.div>

      {/* AI Assistant Grid */}
      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant, index) => (
          <AITypeCard key={assistant.id} {...assistant} index={index} />
        ))}
      </div>

      {/* AI Drawing Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/ai-drawing">
          <div className="group relative overflow-hidden rounded-xl border border-card-border bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 text-center transition-all hover:border-accent/50">
            <div className="relative z-10">
              <h2 className="mb-2 text-2xl font-bold gradient-text">AI 绘图中心</h2>
              <p className="mb-4 text-muted">文字生成图像、头像、Logo、海报、壁纸</p>
              <Button variant="gradient" className="gap-2">
                进入绘图中心
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
