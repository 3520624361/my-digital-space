import { BlogSidebar } from "@/components/blog";
import { PostList } from "@/components/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "探索最新技术文章、开发经验和知识分享",
};

async function getPosts() {
  // Mock data - replace with actual service call
  return {
    posts: [] as any[],
    total: 0,
  };
}

export default async function BlogPage() {
  const { posts, total } = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">博客</h1>
        <p className="mt-2 text-muted">探索最新技术文章、开发经验和知识分享</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted">
              共 {total} 篇文章
            </p>
            {/* Sort/Filter options could go here */}
          </div>
          <PostList posts={posts} />
        </div>

        {/* Sidebar */}
        <div className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
