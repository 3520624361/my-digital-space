import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateReadingTime, slugify } from "@/lib/utils";

// 获取单篇文章
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, displayName: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ success: false, error: "文章不存在" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { ...post, tags: post.tags.map((pt) => pt.tag) },
    });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ success: false, error: "获取文章失败" }, { status: 500 });
  }
}

// 更新文章
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, coverImage, categoryId, tagIds, published, featured } = body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "文章不存在" }, { status: 404 });
    }

    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = slugify(title);
      const slugExists = await prisma.post.findUnique({ where: { slug } });
      if (slugExists && slugExists.id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // 更新标签：先删后加
    if (tagIds) {
      await prisma.postTag.deleteMany({ where: { postId: id } });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        slug,
        content: content ?? existing.content,
        excerpt: excerpt ?? existing.excerpt,
        coverImage: coverImage ?? existing.coverImage,
        readingTime: content ? calculateReadingTime(content) : existing.readingTime,
        published: published ?? existing.published,
        featured: featured ?? existing.featured,
        categoryId: categoryId !== undefined ? (categoryId || null) : existing.categoryId,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : tagIds !== undefined ? { deleteMany: {} } : undefined,
      },
      include: {
        author: { select: { id: true, username: true, displayName: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: { ...post, tags: post.tags.map((pt) => pt.tag) },
      message: "文章更新成功",
    });
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ success: false, error: "更新文章失败" }, { status: 500 });
  }
}

// 删除文章
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "文章不存在" }, { status: 404 });
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "文章已删除" });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ success: false, error: "删除文章失败" }, { status: 500 });
  }
}
