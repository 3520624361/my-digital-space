"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
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

interface Tag {
  id: string;
  name: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
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
      fetch("/api/admin/categories").then((r) => r.json()),
    ]).then(([catData]) => {
      if (catData.success) setCategories(catData.data);
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("标题和内容不能为空");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          authorId: "admin",
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("文章创建成功");
        router.push("/admin/posts");
      } else {
        toast.error(data.error || "创建失败");
      }
    } catch (err) {
      toast.error("创建失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/posts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">写文章</h1>
          <p className="text-sm text-muted">创建新的博客文章</p>
        </div>
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
              placeholder="文章摘要，留空则自动截取前200字"
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
              立即发布
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
            {saving ? "保存中..." : "保存文章"}
          </Button>
          <Link href="/admin/posts">
            <Button type="button" variant="outline">取消</Button>
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
