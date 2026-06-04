"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="glass-card p-12 text-center max-w-md">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-red-500">出错了</h1>
        <p className="mb-2 text-muted">发生了一些错误</p>
        <p className="mb-8 text-sm text-muted/60">
          {error.message || "请稍后再试"}
        </p>
        <Button onClick={reset} variant="gradient" size="lg">
          重试
        </Button>
      </div>
    </div>
  );
}
