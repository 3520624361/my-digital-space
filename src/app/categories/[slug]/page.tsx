import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Folder } from "lucide-react";
import { PostList } from "@/components/blog";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `分类: ${slug}`,
    description: `浏览 ${slug} 分类下的所有文章`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/categories"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          全部分类
        </Link>
        <div className="flex items-center gap-3">
          <Folder className="h-6 w-6 text-accent" />
          <div>
            <h1 className="text-3xl font-bold capitalize">{slug}</h1>
            <p className="text-muted">分类下的所有文章</p>
          </div>
        </div>
      </div>

      <PostList posts={[]} />
    </div>
  );
}
