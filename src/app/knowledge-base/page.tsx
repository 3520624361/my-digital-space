"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Upload, Search, FileText, File, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <BookOpen className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">知识库</h1>
        <p className="text-muted">文档管理、向量检索、AI问答</p>
      </motion.div>

      {/* Search & Upload */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索文档..."
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          上传文档
        </Button>
      </div>

      {/* Supported Formats */}
      <div className="mb-6 flex gap-2">
        {["PDF", "DOCX", "TXT", "MD"].map((fmt) => (
          <Badge key={fmt} variant="secondary">{fmt}</Badge>
        ))}
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card flex flex-col items-center py-16"
      >
        <BookOpen className="mb-4 h-16 w-16 text-muted" />
        <p className="text-lg text-muted">知识库为空</p>
        <p className="mt-1 text-sm text-muted/60">上传你的第一份文档，开启知识管理之旅</p>
        <Button variant="gradient" className="mt-6 gap-2">
          <Upload className="h-4 w-4" />
          上传文档
        </Button>
      </motion.div>

      {/* AI Q&A */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass-card p-6"
      >
        <h2 className="mb-4 text-lg font-semibold">📖 AI 知识问答</h2>
        <p className="mb-4 text-sm text-muted">上传文档后，可以向AI提问获取文档中的知识</p>
        <div className="flex gap-3">
          <Input placeholder="输入你的问题..." className="flex-1" />
          <Button>提问</Button>
        </div>
      </motion.div>
    </div>
  );
}
