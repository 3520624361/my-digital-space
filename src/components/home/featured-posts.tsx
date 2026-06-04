"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: { name: string; slug: string } | null;
  createdAt: string;
  viewCount: number;
}

interface FeaturedPostsProps {
  posts?: FeaturedPost[];
  isLoading?: boolean;
}

function FeaturedPostsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-xl border border-card-border bg-card-bg/50">
          <div className="h-48 rounded-t-xl bg-surface-800/50" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-3/4 rounded bg-surface-800/50" />
            <div className="h-4 w-full rounded bg-surface-800/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

const mockPosts: FeaturedPost[] = [];

export function FeaturedPosts({ posts = mockPosts, isLoading }: FeaturedPostsProps) {
  if (isLoading) return <FeaturedPostsSkeleton />;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">最新文章</h2>
            <p className="mt-1 text-muted">精选技术分享与思考</p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              查看全部 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group h-full overflow-hidden rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center gradient-bg">
                          <FileText className="h-10 w-10 text-white/50" />
                        </div>
                      )}
                      {post.category && (
                        <div className="absolute left-3 top-3">
                          <Badge variant="default" className="border-0 bg-black/50 text-white backdrop-blur-sm">
                            {post.category.name}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 line-clamp-2 text-lg font-semibold group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-muted">
                        {post.excerpt || "暂无摘要..."}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          {post.viewCount}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border py-16">
            <FileText className="mb-4 h-12 w-12 text-muted" />
            <p className="text-lg text-muted">暂无文章</p>
            <p className="mt-1 text-sm text-muted/60">还没有发布任何文章，敬请期待</p>
            <Link href="/blog" className="mt-4">
              <Button variant="outline" size="sm">浏览博客</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
