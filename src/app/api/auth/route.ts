import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    // Mock auth - replace with Supabase Auth
    if (action === "login") {
      return NextResponse.json({ success: true, message: "登录成功" });
    }
    if (action === "register") {
      return NextResponse.json({ success: true, message: "注册成功" });
    }

    return NextResponse.json({ success: false, error: "无效的操作" }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: "请求失败" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ authenticated: false, user: null });
}
