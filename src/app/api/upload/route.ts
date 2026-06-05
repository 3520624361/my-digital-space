import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "请选择文件" }, { status: 400 });
    }

    // 校验文件类型
    if (!file.type.startsWith("audio/")) {
      return NextResponse.json({ success: false, error: "只支持音频文件" }, { status: 400 });
    }

    // 限制 20MB
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "文件不能超过 20MB" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const fileName = `${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { data, error } = await supabase.storage
      .from("music")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 获取公共 URL
    const { data: { publicUrl } } = supabase.storage.from("music").getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      data: { url: publicUrl, fileName, size: file.size },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "上传失败" }, { status: 500 });
  }
}
