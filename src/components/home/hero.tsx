"use client";

import { motion } from "framer-motion";
import { Github, Twitter, ExternalLink, Sparkles, ArrowDown } from "lucide-react";
import { useTypewriter } from "@/hooks";
import { Avatar } from "@/components/ui/avatar";

export function Hero() {
  const typedText = useTypewriter(
    ["构建数字世界", "探索AI无限可能", "创造美好体验"],
    100, 50, 2000
  );

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-6"
          >
            <div className="relative">
              <Avatar
                size="xl"
                fallback="探"
                className="ring-4 ring-accent/20 ring-offset-4 ring-offset-background"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                <Sparkles className="h-3 w-3" />
              </div>
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="mb-2 text-4xl font-bold sm:text-5xl lg:text-6xl">
              你好，我是
              <span className="gradient-text"> 探索者</span>
            </h1>
            <p className="mb-2 text-lg text-muted sm:text-xl">
              全栈开发者 / AI 爱好者
            </p>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-2xl font-light sm:text-3xl">
              <span className="text-accent">&gt; </span>
              <span className="border-r-2 border-accent pr-1 animate-pulse">
                {typedText}
              </span>
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12 flex items-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: ExternalLink, href: "https://space.bilibili.com", label: "Bilibili" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border text-muted hover:border-accent hover:text-accent hover:bg-accent/10 transition-all"
                title={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="animate-bounce"
          >
            <ArrowDown className="h-6 w-6 text-muted" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
