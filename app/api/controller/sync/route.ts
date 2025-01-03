import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const {
    id,
    controllerId,
    name,
    type,
  } = await req.json();
  console.log("type is", type)
  const controller = await db.controller.create({
    data: {
      type: type === "irrigation" ? "Irrigation" : "Greenhouse",
      name,
      userId: id,
      controllerId,
    }
  })
  if (type === "greenhouse") {
    await db.user.update({
      where: {
        id
      },
      data: {
        greenhouseCount: {
          increment: 1
        }
      }
    })
  } else {
    await db.user.update({
      where: {
        id
      },
      data: {
        irrigationCount: {
          increment: 1
        }
      }
    })
  }
  if (controller) {
    return NextResponse.json({ message: "Controller synced sucessfully", }, {
      status: 200,
    })
  }
  return NextResponse.json({ message: "Controller sync failed", }, {
    status: 400,
  })
}
