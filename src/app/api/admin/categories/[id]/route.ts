import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// 更新分类
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, color } = body;

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "分类不存在" }, { status: 404 });
    }

    const data: Record<string, string> = {};
    if (name) {
      data.name = name;
      data.slug = slugify(name);
    }
    if (color) data.color = color;

    const category = await prisma.category.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: category, message: "分类更新成功" });
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json({ success: false, error: "更新分类失败" }, { status: 500 });
  }
}

// 删除分类
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "分类不存在" }, { status: 404 });
    }

    // 检查分类下是否有文章
    const postCount = await prisma.post.count({ where: { categoryId: id } });
    if (postCount > 0) {
      return NextResponse.json(
        { success: false, error: `该分类下有 ${postCount} 篇文章，无法删除` },
        { status: 400 }
      );
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "分类已删除" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json({ success: false, error: "删除分类失败" }, { status: 500 });
  }
}
