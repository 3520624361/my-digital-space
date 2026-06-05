"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, AlertCircle, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { AI_PROVIDER_LIST, MODEL_DISPLAY_NAMES } from "@/lib/ai";
import type { AIMessage, AIType } from "@/types";

interface AIChatProps {
  type: AIType;
  systemPrompt?: string;
}

const suggestedPrompts: Record<string, string[]> = {
  CHAT: ["你好！", "今天有什么新闻？", "帮我解释一下量子计算"],
  WRITING: ["帮我写一篇博客文章", "优化这段文案", "写一首关于秋天的诗"],
  CODE: ["帮我写一个React组件", "解释这段代码", "帮我调试这个错误"],
  TRANSLATE: ["翻译这段话到英文", "这段中文是什么意思？", "帮我本地化这个文本"],
  SUMMARY: ["总结这篇文章", "提取关键要点", "帮我概括这段内容"],
  STUDY: ["解释什么是机器学习", "帮我制定学习计划", "讲解设计模式"],
};

const welcomeMessages: Record<string, string> = {
  CHAT: "你好！我是AI聊天助手，有什么我可以帮你的吗？",
  WRITING: "你好！我是AI写作助手，让我们一起创作吧！",
  CODE: "你好！我是AI代码助手，帮你解决编程问题。",
  TRANSLATE: "你好！我是AI翻译助手，为你提供翻译服务。",
  SUMMARY: "你好！我是AI文章总结助手，帮你快速提取要点。",
  STUDY: "你好！我是AI学习助手，一起探索知识吧！",
};

export function AIChat({ type, systemPrompt }: AIChatProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    { id: "welcome", role: "assistant", content: welcomeMessages[type] || "你好！", createdAt: new Date().toISOString() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // 提供者与模型选择
  const [selectedProvider, setSelectedProvider] = useState<string>(AI_PROVIDER_LIST[0].value);
  const currentProvider = AI_PROVIDER_LIST.find((p) => p.value === selectedProvider);
  const [selectedModel, setSelectedModel] = useState<string>(currentProvider?.models[0] || "");

  // 切换提供者时自动选择该提供者的第一个模型
  const handleProviderChange = useCallback((value: string) => {
    setSelectedProvider(value);
    const provider = AI_PROVIDER_LIST.find((p) => p.value === value);
    if (provider && provider.models.length > 0) {
      setSelectedModel(provider.models[0]);
    }
  }, []);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 停止生成
  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // 创建 AbortController 以便取消请求
    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      // 构建发送给 API 的消息列表（去掉欢迎消息）
      const apiMessages = messages
        .filter((m) => m.id !== "welcome")
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
        body: JSON.stringify({
          provider: selectedProvider,
          model: selectedModel,
          messages: apiMessages,
          systemPrompt,
          stream: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `请求失败 (${res.status})`);
      }

      const contentType = res.headers.get("Content-Type") || "";

      // ===== 流式响应 =====
      if (contentType.includes("text/event-stream")) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullContent = "";
        const aiMessageId = (Date.now() + 1).toString();

        // 先插入一条空白消息，后续逐步填充内容
        setMessages((prev) => [
          ...prev,
          { id: aiMessageId, role: "assistant", content: "", createdAt: new Date().toISOString() },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.error) {
                  setError(parsed.error);
                  // 移除空白占位消息
                  setMessages((prev) => prev.filter((m) => m.id !== aiMessageId));
                  break;
                }
                if (parsed.content) {
                  fullContent += parsed.content;
                  // 渐进更新消息内容（打字机效果）
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === aiMessageId ? { ...m, content: fullContent } : m
                    ),
                  );
                }
              } catch {
                // JSON 解析失败，忽略该行
              }
            }
          }
        }
      } else {
        // ===== 非流式降级 =====
        const data = await res.json();
        const aiMessage: AIMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err: any) {
      if (err.name === "AbortError") return; // 用户主动取消，不显示错误
      setError(err.message || "请求失败，请稍后重试");
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const providerOptions = AI_PROVIDER_LIST.map((p) => ({
    value: p.value,
    label: p.label,
  }));

  const modelOptions = (currentProvider?.models || []).map((m) => ({
    value: m,
    label: MODEL_DISPLAY_NAMES[m] || m,
  }));

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm">
      {/* Provider & Model Selector Toolbar */}
      <div className="flex items-center gap-3 border-b border-card-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-medium text-muted">AI 模型</span>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedProvider}
            onChange={(e) => handleProviderChange(e.target.value)}
            options={providerOptions}
            className="h-8 w-[130px] text-xs"
          />
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            options={modelOptions}
            className="h-8 w-[160px] text-xs"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 错误提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-xs hover:underline"
            >
              关闭
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <Avatar
                  size="sm"
                  fallback="AI"
                  className="bg-accent/10 text-accent"
                >
                  <Bot className="h-4 w-4" />
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  msg.role === "user"
                    ? "bg-accent text-white"
                    : "glass"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <Avatar size="sm" fallback="U" className="bg-primary/10">
                  <User className="h-4 w-4" />
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 加载中提示（仅在没有流式消息时显示） */}
        {isLoading && !messages.some((m) => m.content === "" && m.role === "assistant" && m.id !== "welcome") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <Avatar size="sm" fallback="AI" className="bg-accent/10 text-accent">
              <Bot className="h-4 w-4" />
            </Avatar>
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:0.2s]" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts (shown when only welcome message) */}
      {messages.length === 1 && !error && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {(suggestedPrompts[type] || []).slice(0, 3).map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setInput(prompt);
                }}
                className="rounded-full border border-card-border px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-card-border p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            className="flex-1"
          />
          {isLoading ? (
            <Button onClick={handleStop} variant="destructive" size="icon">
              <StopCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSend}
              loading={isLoading}
              disabled={!input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
