import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="glass-card p-12 text-center max-w-md">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
          <FileQuestion className="h-12 w-12 text-accent" />
        </div>
        <h1 className="mb-2 text-6xl font-bold gradient-text">404</h1>
        <p className="mb-6 text-lg text-muted">页面不存在</p>
        <p className="mb-8 text-sm text-muted/60">
          你访问的页面不存在或已被移除
        </p>
        <Link href="/">
          <Button variant="gradient" size="lg">
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}
