"use client";

import { motion } from "framer-motion";
import { User, Code, BookOpen, Sparkles, Clock, Award } from "lucide-react";

const skills = [
  { name: "Next.js / React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "PostgreSQL", level: 75 },
  { name: "Tailwind CSS", level: 90 },
  { name: "AI / LLM", level: 70 },
];

const timeline = [
  { year: "2024", event: "开始构建 My Digital Space", icon: Sparkles },
  { year: "2023", event: "深入AI应用开发", icon: Award },
  { year: "2022", event: "全栈开发技能提升", icon: Code },
  { year: "2021", event: "开始技术博客写作", icon: BookOpen },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <User className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">关于我</h1>
        <p className="mx-auto max-w-xl text-muted">
          热爱技术，探索未知，用代码创造美好
        </p>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card mb-8 p-6"
      >
        <p className="leading-relaxed text-muted">
          我是筱青，一名全栈开发者和AI爱好者，热衷于探索前沿技术，构建富有创意和实用价值的数字产品。
          这个个人空间是我的数字家园，记录了我的学习历程、技术思考和创意实践。
        </p>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card mb-8 p-6"
      >
        <h2 className="mb-6 text-xl font-bold flex items-center gap-2">
          <Code className="h-5 w-5 text-accent" />
          技术能力
        </h2>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="mb-1 flex justify-between text-sm">
                <span>{skill.name}</span>
                <span className="text-muted">{skill.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                  className="h-full rounded-full gradient-bg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="mb-6 text-xl font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          成长历程
        </h2>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                {index < timeline.length - 1 && (
                  <div className="mt-1 h-full w-px bg-card-border" />
                )}
              </div>
              <div className="pb-6">
                <span className="text-sm font-semibold text-accent">{item.year}</span>
                <p className="text-muted">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
