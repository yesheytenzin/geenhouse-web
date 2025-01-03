import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const usersCount = await db.user.count();
  return NextResponse.json(usersCount);
}
