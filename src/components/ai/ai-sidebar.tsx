"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageCircle, Pencil, Code, Languages, FileText, GraduationCap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const assistants = [
  { id: "chat", name: "AI 聊天", icon: MessageCircle },
  { id: "writing", name: "AI 写作", icon: Pencil },
  { id: "code", name: "AI 代码", icon: Code },
  { id: "translate", name: "AI 翻译", icon: Languages },
  { id: "summary", name: "AI 总结", icon: FileText },
  { id: "study", name: "AI 学习", icon: GraduationCap },
];

export function AISidebar() {
  const pathname = usePathname();
  const currentType = pathname.split("/").pop();

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm p-4">
      <Link href="/ai-center">
        <Button variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          新建对话
        </Button>
      </Link>
      <div className="mt-2 space-y-1">
        {assistants.map((assistant) => {
          const isActive = currentType === assistant.id;
          return (
            <Link
              key={assistant.id}
              href={`/ai-center/${assistant.id}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground hover:bg-accent/5"
              )}
            >
              <assistant.icon className="h-4 w-4" />
              {assistant.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
