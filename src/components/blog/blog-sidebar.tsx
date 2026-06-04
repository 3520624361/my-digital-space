"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Folder, Tag as TagIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Category, Tag } from "@/types";

interface BlogSidebarProps {
  categories?: Category[];
  tags?: Tag[];
}

export function BlogSidebar({ categories, tags }: BlogSidebarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside className="space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="glass-card p-4">
        <h3 className="mb-3 text-sm font-semibold">搜索文章</h3>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="输入关键词..."
          icon={<Search className="h-4 w-4" />}
        />
      </form>

      {/* Categories */}
      <div className="glass-card p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Folder className="h-4 w-4 text-accent" />
          分类
        </h3>
        {categories?.length ? (
          <div className="space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted hover:bg-accent/5 hover:text-accent transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.color || "#6366f1" }}
                  />
                  {cat.name}
                </span>
                <span className="text-xs">{cat._count?.posts || 0}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted/60">暂无分类</p>
        )}
      </div>

      {/* Tags */}
      <div className="glass-card p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <TagIcon className="h-4 w-4 text-accent" />
          标签
        </h3>
        {tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-accent/10 hover:text-accent transition-colors">
                  {tag.name}
                  <span className="ml-1 text-xs opacity-60">({tag._count?.posts || 0})</span>
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted/60">暂无标签</p>
        )}
      </div>
    </aside>
  );
}
