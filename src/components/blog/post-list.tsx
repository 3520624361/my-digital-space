"use client";

import { FileText } from "lucide-react";
import { PostCard } from "./post-card";
import type { Post } from "@/types";

interface PostListProps {
  posts: Post[];
  isLoading?: boolean;
}

function PostListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-card-border bg-card-bg/50">
          <div className="h-48 rounded-t-xl bg-surface-800/50" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-3/4 rounded bg-surface-800/50" />
            <div className="h-4 w-full rounded bg-surface-800/50" />
            <div className="h-4 w-1/2 rounded bg-surface-800/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PostListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border py-20">
      <FileText className="mb-4 h-12 w-12 text-muted" />
      <p className="text-lg text-muted">暂无文章</p>
      <p className="mt-1 text-sm text-muted/60">还没有发布任何文章，敬请期待</p>
    </div>
  );
}

export function PostList({ posts, isLoading }: PostListProps) {
  if (isLoading) return <PostListSkeleton />;
  if (!posts?.length) return <PostListEmpty />;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
