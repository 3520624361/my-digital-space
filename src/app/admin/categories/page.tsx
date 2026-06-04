"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Folder, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

const defaultCategories = [
  { id: "1", name: "技术前沿", slug: "tech", color: "#6366f1", postCount: 0 },
  { id: "2", name: "生活随笔", slug: "life", color: "#f59e0b", postCount: 0 },
  { id: "3", name: "AI探索", slug: "ai", color: "#10b981", postCount: 0 },
];

export default function AdminCategoriesPage() {
  const [categories] = useState(defaultCategories);
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    toast.success(`分类 "${newName}" 已创建`);
    setNewName("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">分类管理</h1>
        <p className="text-sm text-muted">管理文章分类</p>
      </div>

      {/* Add Category */}
      <div className="mb-6 glass-card p-4">
        <div className="flex gap-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="新分类名称"
            className="flex-1"
          />
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            添加分类
          </Button>
        </div>
      </div>

      {/* Category List */}
      <div className="glass-card divide-y divide-card-border">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${cat.color}20` }}>
                <Folder className="h-5 w-5" style={{ color: cat.color }} />
              </div>
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-muted">/{cat.slug} · {cat.postCount} 篇文章</p>
              </div>
              <Badge variant="outline" className="ml-2" style={{ borderColor: cat.color, color: cat.color }}>{cat.color}</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
