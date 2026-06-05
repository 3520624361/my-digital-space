import { NextResponse } from "next/server";

const API_BASE_URL = "https://music-api.gdstudio.xyz/api.php";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams();

    // 转发参数到上游 API
    url.searchParams.forEach((value, key) => {
      if (key !== "s") { // 过滤掉随机签名
        searchParams.set(key, value);
      }
    });

    if (!searchParams.has("types")) {
      return NextResponse.json({ error: "Missing types" }, { status: 400 });
    }

    const apiUrl = `${API_BASE_URL}?${searchParams.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Proxy request failed" },
      { status: 500 }
    );
  }
}
