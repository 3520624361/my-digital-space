"use client";

import { Bookmark } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">我的收藏</h1>
        <p className="text-sm text-muted">收藏的文章和内容</p>
      </div>

      <div className="glass-card flex flex-col items-center py-16">
        <Bookmark className="mb-4 h-12 w-12 text-muted" />
        <p className="text-lg text-muted">暂无收藏</p>
        <p className="mt-1 text-sm text-muted/60">浏览博客时点击收藏按钮即可添加</p>
      </div>
    </div>
  );
}
