import { NextResponse } from "next/server";
import { checkPassword, hashPassword } from "@/utils/bcryptMgr";
import { getUser } from "@/lib/session";
import { db } from "@/lib/db";
//check the password
export async function PATCH(req:Request) {
  const user = await getUser();
  const formData = await req.formData();
  const password = formData.get("password").toString();
  const newPassword = formData.get("newPassword").toString();
  if (user) {
    const admin = await db.admin.findUnique({
      where: {
        username: user.name,
      },
    });
    const passwordMatches = await checkPassword(password, admin.password);
    if (passwordMatches) {
      const hashedPassword = await hashPassword(newPassword);
      const updatedAdmin = await db.admin.update({
        where: {
          username: user.name,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json({ message: "Password has been updated" });
    } else {
      return NextResponse.json(
        {
          message: "The current password didn't match, Try again",
        },
        {
          status: 401,
        },
      );
    }
  }
  return NextResponse.json(
    {
      message: "Operation Unauthorized",
    },
    {
      status: 401,
    },
  );
}
