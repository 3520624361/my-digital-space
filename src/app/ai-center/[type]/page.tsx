"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { AIChat, AISidebar } from "@/components/ai";
import { AI_ASSISTANTS } from "@/lib/ai";
import type { AIType } from "@/types";

const typeMap: Record<string, AIType> = {
  chat: "CHAT",
  writing: "WRITING",
  code: "CODE",
  translate: "TRANSLATE",
  summary: "SUMMARY",
  study: "STUDY",
};

export default function AIChatPage() {
  const params = useParams();
  const type = params.type as string;
  const aiType = typeMap[type];
  const assistant = AI_ASSISTANTS.find((a) => a.id === type);

  if (!aiType || !assistant) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden w-64 shrink-0 lg:block"
        >
          <div className="sticky top-24">
            <AISidebar />
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{assistant.name}</h1>
            <p className="text-muted">{assistant.description}</p>
          </div>
          <AIChat type={aiType} systemPrompt={assistant.systemPrompt} />
        </motion.div>
      </div>
    </div>
  );
}
