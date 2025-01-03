import { NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const user = await getUser();
  if (user) {
    const list = await db.user.findMany({
      where: {
        AND: {
          posLat: {
            not: null
          },
          posLong: {
            not: null
          },
          verifiedAt: {
            not: null
          }
        }
      },
      select: {
        posLat: true,
        posLong: true,
        dzongkhag: true,
        gewog: true,
        registeredAt: true
      }
    })
    return NextResponse.json(list)
  }
  return NextResponse.json({
    message: "Unauthorized"
  }, {
    status: 401
  });
}
