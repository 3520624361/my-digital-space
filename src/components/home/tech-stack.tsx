"use client";

import { motion } from "framer-motion";
import { Code2, Database, Brain, Palette, Server, Terminal } from "lucide-react";

const techs = [
  { name: "Next.js", description: "React 框架", icon: Terminal, color: "#ffffff" },
  { name: "React", description: "UI 库", icon: Code2, color: "#61dafb" },
  { name: "TypeScript", description: "类型安全", icon: Code2, color: "#3178c6" },
  { name: "Tailwind CSS", description: "样式框架", icon: Palette, color: "#06b6d4" },
  { name: "Prisma", description: "ORM", icon: Database, color: "#2d3748" },
  { name: "PostgreSQL", description: "数据库", icon: Database, color: "#336791" },
  { name: "OpenAI", description: "AI 集成", icon: Brain, color: "#10a37f" },
  { name: "NextAuth", description: "认证系统", icon: Server, color: "#6366f1" },
];

export function TechStack() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">技术栈</h2>
          <p className="mt-1 text-muted">构建本平台的核心技术</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="glass-card flex flex-col items-center p-4 text-center hover:border-accent/50 transition-all">
                <tech.icon className="mb-2 h-8 w-8 transition-transform group-hover:scale-110" style={{ color: tech.color }} />
                <p className="text-xs font-medium">{tech.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
