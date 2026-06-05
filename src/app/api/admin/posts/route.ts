import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateReadingTime, slugify } from "@/lib/utils";

// 获取文章列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const skip = (page - 1) * pageSize;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        include: {
          author: { select: { id: true, username: true, displayName: true } },
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.post.count(),
    ]);

    const formatted = posts.map((p) => ({
      ...p,
      tags: p.tags.map((pt) => pt.tag),
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { success: false, error: "获取文章列表失败" },
      { status: 500 }
    );
  }
}

// 创建文章
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, coverImage, categoryId, tagIds, published, featured, authorId } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "标题和内容不能为空" },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    // 确保 slug 唯一
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.slice(0, 200),
        coverImage: coverImage || null,
        readingTime: calculateReadingTime(content),
        published: published ?? false,
        featured: featured ?? false,
        authorId: authorId || "admin",
        categoryId: categoryId || null,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : undefined,
      },
      include: {
        author: { select: { id: true, username: true, displayName: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json(
      { success: true, data: { ...post, tags: post.tags.map((pt) => pt.tag) }, message: "文章创建成功" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { success: false, error: "创建文章失败" },
      { status: 500 }
    );
  }
}
