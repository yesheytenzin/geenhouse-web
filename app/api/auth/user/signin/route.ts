import { checkPassword } from "@/utils/bcryptMgr";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { env } from "@/env";
import { generateAccessToken, setExpirationDate } from "@/utils/tokengtr";

export async function POST(req: Request) {

  const { username, password } = await req.json();

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      id: true,
      mobile: true,
      dzongkhag: true,
      gewog: true,
      greenhouseCount: true,
      irrigationCount: true,
      cid: true,
      brokerId: true,
      password: true,
      brokerPort: true,
      verifiedAt: true,
    },
  });

  const isPasswordCorrect = await checkPassword(
    password,
    user?.password as string,
  );
  // if user is only verified, then allow login
  if (user?.verifiedAt) {
    // remove it from payload
    delete user["verifiedAt"];

    // create token while login to allow for authorization, should be replaced by jwt in future
    const token = await db.accessToken.create({
      data: {
        token: generateAccessToken(),
        userId: user.id,
        expiresAt: setExpirationDate(),
      },
    });

    if (isPasswordCorrect) {
      if (user) {
        const modifiedUser = {
          ...user,
          brokerIp: env.EMQX_CONNECT_URL,
          accessToken: token,
        };
        const userAny = modifiedUser as any;
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        userAny.expirationDate = expirationDate.toISOString();
        return NextResponse.json(userAny, {
          status: 200,
        });
      }
    } else {
      return NextResponse.json(
        { message: "Incorrect password or username" },
        {
          status: 400,
        },
      );
    }
  }
  return NextResponse.json(
    { message: "User not verfied,verify first" },
    {
      status: 400,
    },
  );
}
