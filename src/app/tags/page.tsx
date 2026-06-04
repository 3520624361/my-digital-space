import Link from "next/link";
import { Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "标签",
  description: "浏览所有文章标签",
};

export default function TagsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">文章标签</h1>
        <p className="mt-2 text-muted">按标签浏览所有文章</p>
      </div>

      <div className="glass-card p-8">
        <div className="flex flex-wrap gap-3">
          {/* Placeholder tags - replace with actual data */}
          {["Next.js", "React", "TypeScript", "AI", "设计", "前端", "后端", "数据库", "性能优化", "开发工具", "开源", "架构"].map((tag) => (
            <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
              <Badge
                variant="default"
                className="cursor-pointer px-4 py-2 text-sm hover:bg-accent/20 transition-all hover:scale-105"
              >
                <TagIcon className="mr-1.5 h-3.5 w-3.5" />
                {tag}
                <span className="ml-1.5 text-xs opacity-60">(0)</span>
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
