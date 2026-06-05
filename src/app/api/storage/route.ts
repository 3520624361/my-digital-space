import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ d1Available: false, data: {} });
}

export async function POST() {
  return NextResponse.json({ d1Available: false });
}

export async function DELETE() {
  return NextResponse.json({ d1Available: false });
}
