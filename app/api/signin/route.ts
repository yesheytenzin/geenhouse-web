import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkPassword } from "@/utils/bcryptMgr";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = await db.admin.findUnique({
    where: {
      username,
    },
  });
  const passwordMatch = await checkPassword(password, user?.password as string);
  if (user) {
    if (passwordMatch) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json(null, { status: 401 });
  } else {
    console.log("User not found");
  }
  return NextResponse.json(null, { status: 401 });
}
