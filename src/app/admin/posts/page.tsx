"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  category: { id: string; name: string; color: string } | null;
  tags: { id: string; name: string }[];
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`确定要删除「${title}」吗？此操作不可撤销。`)) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("文章已删除");
        fetchPosts();
      } else {
        toast.error(data.error || "删除失败");
      }
    } catch (err) {
      toast.error("删除失败");
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">文章管理</h1>
          <p className="text-sm text-muted">共 {posts.length} 篇文章</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            写文章
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
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
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card flex items-center gap-4 p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{post.title}</h3>
                  {post.featured && (
                    <Badge variant="success" className="shrink-0">推荐</Badge>
                  )}
                  <Badge variant={post.published ? "default" : "secondary"} className="shrink-0">
                    {post.published ? "已发布" : "草稿"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  {post.category && (
                    <span style={{ color: post.category.color }}>{post.category.name}</span>
                  )}
                  <span>{formatDate(post.createdAt)}</span>
                  <span>{post.viewCount} 次浏览</span>
                  <span>❤️ {post.likeCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/blog/${post.slug}`} target="_blank">
                  <Button variant="ghost" size="icon" title="预览">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/admin/posts/${post.id}`}>
                  <Button variant="ghost" size="icon" title="编辑">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  title="删除"
                  onClick={() => handleDelete(post.id, post.title)}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
