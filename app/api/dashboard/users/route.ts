import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const users = await db.user.findMany({
    select: {
      username: true,
      dzongkhag: true,
      gewog: true,
      registeredAt: true
    }
  });
  return NextResponse.json(users);
}
