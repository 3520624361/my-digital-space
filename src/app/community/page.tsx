"use client";

import { motion } from "framer-motion";
import { MessageCircle, Heart, Users, Send, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: MessageCircle, label: "发帖讨论", desc: "分享想法和见解" },
  { icon: Heart, label: "点赞互动", desc: "支持优质内容" },
  { icon: Users, label: "关注好友", desc: "追踪感兴趣的人" },
  { icon: Send, label: "私信沟通", desc: "一对一交流" },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <Lock className="h-10 w-10 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">社区</h1>
        <p className="mx-auto max-w-md text-lg text-muted">
          社区功能正在开发中，即将上线
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-3 right-3">
              <Lock className="h-4 w-4 text-muted" />
            </div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">{feature.label}</h3>
            <p className="text-sm text-muted">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-sm text-muted flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          敬请期待，社区功能即将到来
        </p>
      </motion.div>
    </div>
  );
}
