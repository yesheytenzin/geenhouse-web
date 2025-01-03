import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utils/bcryptMgr";
import { db } from "@/lib/db";
import { createEMQXUser, generateBrokerId } from "./verify-user/emqx";
import { env } from "@/env";
import { getUser } from "@/lib/session";

interface User {
  username: string;
  password: string;
  cid: string;
  mobile: string;
  gewog: string;
  dzongkhag: string;
  brokerId: string;
  brokerIp: string;
  brokerPort: number;
  registrantId: string;
  posLat?: string;
  posLong?: string;
  verifiedAt?: Date;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const registrantId = req.headers.get("registrantId")?.toString();

  if (!registrantId) {
    return NextResponse.json(
      { message: "Registrant ID is required" },
      { status: 400 },
    );
  }

  try {
    await db.$transaction(async (prisma) => {
      const validRegistrantToken = await prisma.registrantToken.findUnique({
        where: { token: registrantId },
      });

      if (!validRegistrantToken) {
        throw new Error("Invalid registrant token");
      }

      if (validRegistrantToken.hasUser) {
        throw new Error("Registrant token has already been used");
      }

      const username = form.get("username")?.toString().trim() || "";
      const cid = form.get("cid")?.toString().trim() || "";
      const mobile = form.get("mobile")?.toString().trim() || "";

      // Check for existing credentials
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username: username }, { cid: cid }, { mobile: mobile }],
        },
      });

      if (existingUser) {
        let message = "";
        if (existingUser.username === username) {
          message = "Username is already taken";
        } else if (existingUser.cid === cid) {
          message = "CID is already registered";
        } else if (existingUser.mobile === mobile) {
          message = "Mobile number is already in use";
        }
        throw new Error(message);
      }
      // if not error

      const brokerId = generateBrokerId(username, mobile);

      const trimmedUser: User = {
        username: username,
        password: await hashPassword(form.get("password")?.toString() || ""),
        cid: cid,
        mobile: mobile,
        gewog: form.get("gewog")?.toString().trim() || "",
        dzongkhag: form.get("dzongkhag")?.toString().trim() || "",
        brokerId: brokerId,
        brokerIp: env.EMQX_BASE_URL,
        brokerPort: Number(env.EMQX_PORT),
        registrantId: validRegistrantToken.token,
        verifiedAt: new Date(),
      };

      const lat = form.get("lat")?.toString();
      const long = form.get("long")?.toString();
      if (lat && long) {
        trimmedUser.posLat = lat;
        trimmedUser.posLong = long;
      }

      await createEMQXUser({
        user_id: trimmedUser.username,
        password: trimmedUser.password,
        is_superuser: false,
      });

      const savedUser = await prisma.user.create({
        data: trimmedUser,
      });

      await prisma.registrantToken.update({
        where: { token: registrantId },
        data: { hasUser: true },
      });

      return savedUser;
    });

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "An unexpected error occurred during registration" },
      { status: 500 },
    );
  }
}
export async function DELETE(req: Request) {
  const userIsAuthenticated = await getUser();
  const { id } = await req.json();
  if (userIsAuthenticated) {
    const user = await db.user.deleteMany({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "There was an error while deleting the user",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        message: "User deleted successfully",
      },
      { status: 200 },
    );
  }
  return NextResponse.json(
    {
      message: "Operation unauthorized",
    },
    { status: 401 },
  );
}
