"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, AtSign, Globe, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("设置已保存！");
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-6 text-2xl font-bold">个人设置</h1>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="glass-card p-6">
            <h2 className="mb-4 text-sm font-semibold text-muted">头像</h2>
            <div className="flex items-center gap-4">
              <Avatar size="xl" fallback="U" />
              <Button variant="outline" size="sm" className="gap-2">
                <Camera className="h-4 w-4" />
                更换头像
              </Button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="mb-4 text-sm font-semibold text-muted">基本信息</h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium">昵称</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="输入你的昵称"
                icon={<User className="h-4 w-4" />}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">个人简介</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="介绍一下自己..."
                rows={3}
                className="w-full rounded-lg border border-card-border bg-transparent p-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">网站</label>
              <Input
                placeholder="https://your-website.com"
                icon={<Globe className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Button onClick={handleSave} loading={isLoading} size="lg" className="gap-2">
              <Save className="h-4 w-4" />
              保存设置
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
