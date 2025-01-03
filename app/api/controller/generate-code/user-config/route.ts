import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  const userAuth = await getUser();
  if (userAuth) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        brokerId: true,
        brokerIp: true,
        brokerPort: true,
        password: true,
      },
    });
    return NextResponse.json(user);
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
