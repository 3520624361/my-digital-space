import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imageParam = url.searchParams.get("image") || url.searchParams.get("url");

  if (!imageParam) {
    return NextResponse.json({ error: "Missing image parameter" }, { status: 400 });
  }

  // 简化版：返回默认调色板，前端会降级到 Canvas API
  return NextResponse.json({
    source: "default",
    baseColor: "#6366f1",
    averageColor: "#6366f1",
    accentColor: "#6366f1",
    contrastColor: "#ffffff",
    gradients: {
      light: {
        colors: ["#e0e7ff", "#c7d2fe", "#a5b4fc"],
        gradient: "linear-gradient(140deg, #e0e7ff 0%, #c7d2fe 45%, #a5b4fc 100%)",
      },
      dark: {
        colors: ["#1e1b4b", "#312e81", "#3730a3"],
        gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #3730a3 100%)",
      },
    },
    tokens: {
      light: { primaryColor: "#6366f1", primaryColorDark: "#4f46e5" },
      dark: { primaryColor: "#818cf8", primaryColorDark: "#6366f1" },
    },
  });
}
