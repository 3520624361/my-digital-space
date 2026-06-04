import Link from "next/link";
import { Folder, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "分类",
  description: "浏览所有文章分类",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">文章分类</h1>
        <p className="mt-2 text-muted">按分类浏览所有文章</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder categories - replace with actual data */}
        {[
          { name: "技术前沿", slug: "tech", color: "#6366f1", count: 0 },
          { name: "生活随笔", slug: "life", color: "#f59e0b", count: 0 },
          { name: "AI探索", slug: "ai", color: "#10b981", count: 0 },
        ].map((cat) => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`}>
            <div className="group glass-card p-6 hover:border-accent/50 transition-all">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  <Folder className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted">{cat.count} 篇文章</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                浏览分类
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
