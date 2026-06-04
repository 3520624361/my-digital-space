import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Eye, ArrowLeft, Tag as TagIcon } from "lucide-react";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CommentSection } from "@/components/blog";
import type { Post } from "@/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  return null; // Replace with actual DB query
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "文章未找到" };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.createdAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回博客
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          {post.category && <Badge>{post.category.name}</Badge>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Avatar size="sm" fallback={post.author.displayName?.[0] || "U"} />
            <span>{post.author.displayName || post.author.username}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(post.createdAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTime || calculateReadingTime(post.content)} 分钟阅读
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            {post.viewCount + 1} 次阅读
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img src={post.coverImage} alt={post.title} className="w-full object-cover" />
        </div>
      )}

      {post.tags?.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag: any) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <Badge variant="secondary" className="cursor-pointer">
                <TagIcon className="mr-1 h-3 w-3" />
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-muted italic">
          文章内容将在接入数据库后显示。请先在后台发布文章。
        </p>
      </div>

      <div className="mb-8 glass-card p-6">
        <div className="flex items-center gap-4">
          <Avatar size="lg" fallback={post.author.displayName?.[0] || "U"} />
          <div>
            <h3 className="font-semibold">{post.author.displayName || post.author.username}</h3>
            <p className="text-sm text-muted">个人博客作者，分享技术与思考</p>
          </div>
        </div>
      </div>

      <CommentSection postId={post.id} />
    </article>
  );
}
