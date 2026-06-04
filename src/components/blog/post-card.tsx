"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, Heart, ArrowRight } from "lucide-react";
import { cn, formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <article className="group relative overflow-hidden rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
          {/* Cover Image */}
          <div className="relative h-48 overflow-hidden">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center gradient-bg">
                <span className="text-3xl font-bold text-white/50">{post.title[0]}</span>
              </div>
            )}
            {/* Category Badge */}
            {post.category && (
              <div className="absolute left-3 top-3">
                <Badge
                  variant="default"
                  className="border-0 bg-white/90 text-gray-900 backdrop-blur-sm dark:bg-black/50 dark:text-white"
                >
                  {post.category.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted">
              {post.excerpt || "暂无摘要..."}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime || calculateReadingTime(post.content)} 分钟
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {post.viewCount}
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" />
                {post.likeCount}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
