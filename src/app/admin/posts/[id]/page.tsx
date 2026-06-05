"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    categoryId: "",
    tagIds: [] as string[],
    published: false,
    featured: false,
  });

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/posts/${id}`).then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ]).then(([postData, catData]) => {
      if (postData.success) {
        const p = postData.data;
        setForm({
          title: p.title || "",
          content: p.content || "",
          excerpt: p.excerpt || "",
          coverImage: p.coverImage || "",
          categoryId: p.category?.id || "",
          tagIds: p.tags?.map((t: { id: string }) => t.id) || [],
          published: p.published,
          featured: p.featured,
        });
      }
      if (catData.success) setCategories(catData.data);
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("标题和内容不能为空");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("文章更新成功");
        router.push("/admin/posts");
      } else {
        toast.error(data.error || "更新失败");
      }
    } catch (err) {
      toast.error("更新失败");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("确定要删除这篇文章吗？此操作不可撤销。")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("文章已删除");
        router.push("/admin/posts");
      }
    } catch (err) {
      toast.error("删除失败");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">编辑文章</h1>
            <p className="text-sm text-muted">修改文章内容</p>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-2">
          <Trash2 className="h-4 w-4" />
          删除
        </Button>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="glass-card space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">标题 *</label>
            <Input
              placeholder="输入文章标题"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">内容 * (支持 Markdown)</label>
            <Textarea
              placeholder="在此输入文章内容..."
              rows={16}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">摘要</label>
            <Textarea
              placeholder="文章摘要"
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">封面图片链接</label>
              <Input
                placeholder="https://..."
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">分类</label>
              <Select
                options={categories.map((c) => ({ label: c.name, value: c.id }))}
                placeholder="选择分类"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-card-border"
              />
              已发布
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-card-border"
              />
              设为推荐
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" loading={saving} className="gap-2">
            <Save className="h-4 w-4" />
            {saving ? "保存中..." : "保存修改"}
          </Button>
          <Link href="/admin/posts">
            <Button type="button" variant="outline">取消</Button>
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
