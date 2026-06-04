import { prisma } from "@/lib/prisma";
import type { Post, Category, Tag, PaginatedResponse } from "@/types";

export async function getPosts(page = 1, pageSize = 10): Promise<PaginatedResponse<Post>> {
  const skip = (page - 1) * pageSize;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      include: {
        author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return {
    success: true,
    data: (posts || []).map((p: any) => ({
      ...p,
      tags: (p.tags || []).map((pt: any) => pt.tag),
    })) as unknown as Post[],
    total: total || 0,
    page,
    pageSize,
    totalPages: Math.ceil((total || 0) / pageSize),
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
      category: true,
      tags: { include: { tag: true } },
    },
  });

  if (!post) return null;
  await prisma.post.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } });

  return { ...post, tags: (post.tags || []).map((pt: any) => pt.tag) } as unknown as Post;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true, featured: true },
    include: {
      author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (posts || []).map((p: any) => ({ ...p, tags: (p.tags || []).map((pt: any) => pt.tag) })) as unknown as Post[];
}

export async function getCategories(): Promise<Category[]> {
  return (prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
  }) as unknown as Category[]) || [];
}

export async function getTags(): Promise<Tag[]> {
  return (prisma.tag.findMany({
    include: { _count: { select: { posts: true } } },
  }) as unknown as Tag[]) || [];
}

export async function getPostsByCategory(slug: string, page = 1): Promise<PaginatedResponse<Post>> {
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { success: false, error: "分类不存在", data: [], total: 0, page, pageSize: 10, totalPages: 0 };

  const skip = (page - 1) * 10;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, categoryId: category.id },
      include: {
        author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: 10,
    }),
    prisma.post.count({ where: { published: true, categoryId: category.id } }),
  ]);

  return {
    success: true,
    data: (posts || []).map((p: any) => ({ ...p, tags: (p.tags || []).map((pt: any) => pt.tag) })) as unknown as Post[],
    total: total || 0, page, pageSize: 10,
    totalPages: Math.ceil((total || 0) / 10),
  };
}

export async function getPostsByTag(slug: string, page = 1): Promise<PaginatedResponse<Post>> {
  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) return { success: false, error: "标签不存在", data: [], total: 0, page, pageSize: 10, totalPages: 0 };

  const skip = (page - 1) * 10;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, tags: { some: { tagId: tag.id } } },
      include: {
        author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: 10,
    }),
    prisma.post.count({ where: { published: true, tags: { some: { tagId: tag.id } } } }),
  ]);

  return {
    success: true,
    data: (posts || []).map((p: any) => ({ ...p, tags: (p.tags || []).map((pt: any) => pt.tag) })) as unknown as Post[],
    total: total || 0, page, pageSize: 10,
    totalPages: Math.ceil((total || 0) / 10),
  };
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (posts || []).map((p: any) => ({ ...p, tags: (p.tags || []).map((pt: any) => pt.tag) })) as unknown as Post[];
}

export async function getRelatedPosts(postId: string, tagIds: string[]): Promise<Post[]> {
  if (tagIds.length === 0) return [];
  const posts = await prisma.post.findMany({
    where: { published: true, id: { not: postId }, tags: { some: { tagId: { in: tagIds } } } },
    include: {
      author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: { viewCount: "desc" },
    take: 4,
  });
  return (posts || []).map((p: any) => ({ ...p, tags: (p.tags || []).map((pt: any) => pt.tag) })) as unknown as Post[];
}

export async function likePost(postId: string, userId: string): Promise<boolean> {
  try {
    await prisma.like.create({ data: { postId, userId } });
    await prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } });
    return true;
  } catch { return false; }
}

export async function unlikePost(postId: string, userId: string): Promise<boolean> {
  try {
    await prisma.like.delete({ where: { userId_postId: { userId, postId } } });
    await prisma.post.update({ where: { id: postId }, data: { likeCount: { decrement: 1 } } });
    return true;
  } catch { return false; }
}
