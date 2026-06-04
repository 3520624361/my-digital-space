"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Github, Chrome, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(mode === "login" ? "登录成功！" : "注册成功！");
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">My Digital Space</h1>
            <p className="mt-1 text-sm text-muted">
              {mode === "login" ? "欢迎回来" : "创建你的账号"}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-lg border border-card-border p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-accent text-white shadow-lg"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {m === "login" ? "登录" : "注册"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div
                  key="username"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="用户名"
                    icon={<User className="h-4 w-4" />}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="邮箱"
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              icon={<Lock className="h-4 w-4" />}
              required
            />

            <Button type="submit" loading={isLoading} className="w-full" size="lg">
              {mode === "login" ? "登录" : "注册"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-card-border" />
            <span className="text-xs text-muted">或</span>
            <div className="flex-1 border-t border-card-border" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.error("GitHub登录待配置")}>
              <Github className="h-4 w-4" /> GitHub
            </Button>
            <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.error("Google登录待配置")}>
              <Chrome className="h-4 w-4" /> Google
            </Button>
          </div>

          {/* Switch Mode */}
          <p className="mt-6 text-center text-sm text-muted">
            {mode === "login" ? "还没有账号？" : "已有账号？"}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="ml-1 text-accent hover:underline"
            >
              {mode === "login" ? "立即注册" : "立即登录"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
