import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const where = search ? {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { artist: { contains: search, mode: "insensitive" as const } },
      ],
    } : {};

    const songs = await prisma.song.findMany({
      where,
      orderBy: { playCount: "desc" },
      take: 50,
    });

    return NextResponse.json({ success: true, data: songs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "获取歌曲失败" }, { status: 500 });
  }
}
