"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, User, Hash, Layout, Wallpaper, Sparkles, Wand2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const modes = [
  { id: "text-to-image", name: "文生图", description: "用文字描述生成图像", icon: ImageIcon, color: "from-violet-500/20 to-purple-500/20" },
  { id: "avatar", name: "头像生成", description: "生成个性化头像", icon: User, color: "from-blue-500/20 to-cyan-500/20" },
  { id: "logo", name: "Logo生成", description: "生成品牌Logo设计", icon: Hash, color: "from-amber-500/20 to-orange-500/20" },
  { id: "poster", name: "海报生成", description: "生成创意海报", icon: Layout, color: "from-pink-500/20 to-rose-500/20" },
  { id: "wallpaper", name: "壁纸生成", description: "生成精美壁纸", icon: Wallpaper, color: "from-emerald-500/20 to-teal-500/20" },
];

const mockImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
  "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400",
];

export default function AIDrawingPage() {
  const [activeMode, setActiveMode] = useState("text-to-image");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setImages(mockImages);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <Wand2 className="h-8 w-8 text-purple-500" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">AI 绘图中心</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          用AI激发创意灵感，生成图像、头像、Logo、海报、壁纸
        </p>
      </motion.div>

      {/* Mode Selection */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={cn(
              "group relative overflow-hidden rounded-xl border p-4 text-center transition-all",
              activeMode === mode.id
                ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                : "border-card-border bg-card-bg/50 hover:border-accent/50"
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", mode.color)} />
            <div className="relative z-10">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <mode.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium">{mode.name}</h3>
              <p className="mt-1 text-xs text-muted">{mode.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Prompt Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述你想要生成的图像，越详细效果越好..."
                  className="h-12 text-base"
                  icon={<Sparkles className="h-5 w-5" />}
                />
              </div>
              <Button
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!prompt.trim()}
                size="lg"
                className="gap-2"
              >
                {!isGenerating && <Wand2 className="h-5 w-5" />}
                生成
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {images.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  src={url}
                  alt={`Generated ${index + 1}`}
                  className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Download className="h-4 w-4" />
                    下载
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border py-20">
            <Wand2 className="mb-4 h-12 w-12 text-muted" />
            <p className="text-lg text-muted">AI 绘图，激发创意灵感</p>
            <p className="mt-1 text-sm text-muted/60">输入描述文字，点击生成按钮</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
