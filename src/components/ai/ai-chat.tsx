"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `这是对"${input.trim()}"的回复。在实际项目中，这里会调用AI API返回真实的回复内容。`,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

        {isLoading && (
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
      {messages.length === 1 && (
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
          <Button
            onClick={handleSend}
            loading={isLoading}
            disabled={!input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
