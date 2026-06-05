import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取歌曲列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "50");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * pageSize;

    const where = search ? {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { artist: { contains: search, mode: "insensitive" as const } },
      ],
    } : {};

    const [songs, total] = await Promise.all([
      prisma.song.findMany({
        where,
        orderBy: { playCount: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.song.count({ where }),
    ]);

    return NextResponse.json({ success: true, data: songs, total, page, pageSize });
  } catch (error) {
    return NextResponse.json({ success: false, error: "获取歌曲失败" }, { status: 500 });
  }
}

// 创建歌曲
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, artist, album, duration, coverUrl, audioUrl, lyrics } = body;

    if (!title || !artist || !audioUrl) {
      return NextResponse.json({ success: false, error: "歌曲名、歌手和音频链接不能为空" }, { status: 400 });
    }

    const song = await prisma.song.create({
      data: {
        title,
        artist,
        album: album || null,
        duration: duration || 0,
        coverUrl: coverUrl || null,
        audioUrl,
        lyrics: lyrics || null,
      },
    });

    return NextResponse.json({ success: true, data: song, message: "歌曲添加成功" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "添加歌曲失败" }, { status: 500 });
  }
}
