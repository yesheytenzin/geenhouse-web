import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  const user = await getUser();
  if (user) {
    const greenhouseControllers = await db.controller.findMany({
      where: {
        userId: userId,
        type: 'Greenhouse'
      },
      select: {
        controllerId: true,
        name: true
      }
    })
    return NextResponse.json(greenhouseControllers);
  }
  return NextResponse.json({
    message: "Unauthorized"
  }, {
    status: 401
  })
}
