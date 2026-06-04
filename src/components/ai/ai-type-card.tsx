"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AITypeCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  index?: number;
}

const iconMap: Record<string, LucideIcon> = {
  MessageCircle: Icons.MessageCircle,
  Pencil: Icons.Pencil,
  Code: Icons.Code,
  Languages: Icons.Languages,
  FileText: Icons.FileText,
  GraduationCap: Icons.GraduationCap,
};

export function AITypeCard({ id, name, description, icon, index = 0 }: AITypeCardProps) {
  const Icon = iconMap[icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/ai-center/${id}`}>
        <div className="group relative overflow-hidden rounded-xl border border-card-border bg-card-bg backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-accent/5 blur-xl group-hover:bg-accent/10 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
