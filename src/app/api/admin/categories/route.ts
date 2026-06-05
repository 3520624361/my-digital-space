import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// 获取分类列表
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ success: false, error: "获取分类失败" }, { status: 500 });
  }
}

// 创建分类
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, color } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "分类名称不能为空" }, { status: 400 });
    }

    const slug = slugify(name);

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "分类已存在" }, { status: 409 });
    }

    const category = await prisma.category.create({
      data: { name, slug, color: color || "#6366f1" },
    });

    return NextResponse.json({ success: true, data: category, message: "分类创建成功" }, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ success: false, error: "创建分类失败" }, { status: 500 });
  }
}
