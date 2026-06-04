import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  return NextResponse.json({
    success: true,
    data: [],
    total: 0,
    page,
    pageSize,
    totalPages: 0,
  });
}
