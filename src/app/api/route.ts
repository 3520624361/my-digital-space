import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    name: "My Digital Space",
    version: "1.0.0",
    description: "个人博客娱乐平台",
    timestamp: new Date().toISOString(),
  });
}
