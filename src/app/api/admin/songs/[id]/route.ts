import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 更新歌曲
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.song.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "歌曲不存在" }, { status: 404 });
    }

    const song = await prisma.song.update({ where: { id }, data: body });
    return NextResponse.json({ success: true, data: song, message: "歌曲更新成功" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "更新歌曲失败" }, { status: 500 });
  }
}

// 删除歌曲
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.song.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "歌曲不存在" }, { status: 404 });
    }

    await prisma.song.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "歌曲已删除" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "删除歌曲失败" }, { status: 500 });
  }
}
