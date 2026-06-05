import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalPosts, totalUsers, totalComments, totalViews] = await Promise.all([
      prisma.post.count(),
      prisma.user.count(),
      prisma.comment.count(),
      prisma.post.aggregate({ _sum: { viewCount: true } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalPosts,
        totalUsers,
        totalComments,
        totalViews: totalViews._sum.viewCount || 0,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { success: false, error: "获取统计数据失败" },
      { status: 500 }
    );
  }
}
