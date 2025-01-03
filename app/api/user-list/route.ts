import { NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import { db } from "@/lib/db";
export async function GET(req: Request) {
  const user = await getUser();
  const userList = await db.user.findMany({
    select: {
      id: true,
      username: true,
      cid: true,
      gewog: true,
      mobile: true,
      dzongkhag: true,
      irrigationCount: true,
      greenhouseCount: true,
      registeredAt: true
    },
    where: {
      verifiedAt: {
        not: null
      }
    }
  })
  if (user) {
    return NextResponse.json(userList)
  }
  return NextResponse.json({ message: "You are not authorized to view this page" }, { status: 401 })
}
