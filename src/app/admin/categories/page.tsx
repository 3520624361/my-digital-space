"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderTree, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  _count?: { posts: number };
}

const COLORS = [
  "#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e",
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#06b6d4", "#3b82f6", "#64748b", "#78716c", "#000000",
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setColor("#6366f1");
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("分类名称不能为空");
      return;
    }

    try {
      const url = editingId
        ? `/api/admin/categories/${editingId}`
        : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingId ? "分类已更新" : "分类已创建");
        resetForm();
        fetchCategories();
      } else {
        toast.error(data.error || "操作失败");
      }
    } catch {
      toast.error("操作失败");
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setColor(cat.color);
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`确定要删除分类「${name}」吗？`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("分类已删除");
        fetchCategories();
      } else {
        toast.error(data.error || "删除失败");
      }
    } catch {
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
        <div>
          <h1 className="text-2xl font-bold">分类管理</h1>
          <p className="text-sm text-muted">共 {categories.length} 个分类</p>
        </div>
        <Button
          className="gap-2"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          <Plus className="h-4 w-4" />
          新建分类
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit}
          className="glass-card mb-6 space-y-4 p-6"
        >
          <h3 className="font-semibold">{editingId ? "编辑分类" : "新建分类"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">名称</label>
              <Input
                placeholder="分类名称"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">颜色</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      color === c ? "border-foreground scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit">{editingId ? "保存修改" : "创建"}</Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              取消
            </Button>
          </div>
        </motion.form>
      )}

      {/* List */}
      {categories.length === 0 ? (
        <div className="glass-card flex flex-col items-center py-16">
          <FolderTree className="mb-4 h-12 w-12 text-muted" />
          <p className="text-lg text-muted">暂无分类</p>
          <p className="mt-1 text-sm text-muted/60">创建第一个文章分类</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card flex items-center gap-4 p-4"
            >
              <div
                className="h-4 w-4 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <div className="flex-1">
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-xs text-muted">
                  slug: {cat.slug} · {cat._count?.posts ?? 0} 篇文章
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(cat.id, cat.name)}
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
