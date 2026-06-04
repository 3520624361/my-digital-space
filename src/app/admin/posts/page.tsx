"use client";

import { motion } from "framer-motion";
import { FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AdminPostsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">文章管理</h1>
          <p className="text-sm text-muted">管理所有博客文章</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            写文章
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      <div className="glass-card flex flex-col items-center py-16">
        <FileText className="mb-4 h-12 w-12 text-muted" />
        <p className="text-lg text-muted">暂无文章</p>
        <p className="mt-1 text-sm text-muted/60">点击"写文章"创建你的第一篇文章</p>
        <Link href="/admin/posts/new" className="mt-4">
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            写文章
          </Button>
        </Link>
      </div>
    </div>
  );
}
