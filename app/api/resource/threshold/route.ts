import { db } from "@/lib/db";
import { getUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  if (role === "admin") {
    const user = await getUser();
    const isAdmin = await db.admin.findUnique({
      where: {
        email: user.email
      },
    });
    if (isAdmin) {
      const data = await db.environmentParameterThreshold.findMany();
      return NextResponse.json(data);
    }
    return NextResponse.json(
      {
        message: "Not Authorized",
      },
      {
        status: 401,
      },
    );
  } else {
    const authorizationHeader = req.headers.get("Authorization");

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      const token = authorizationHeader.slice(7); // Remove "Bearer " from the token
      // Now 'token' contains the actual token value
      const isValid = await db.accessToken.findUnique({
        where: {
          token,
          expiresAt: {
            gte: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
          },
        },
      });
      if (isValid) {
        const data = await db.environmentParameterThreshold.findMany({
          select: {
            name: true,
            maxThreshold: true,
            minThreshold: true,
            type: true,
          },
        });
        return NextResponse.json(data);
      }
      return NextResponse.json({
        message: "Authorization token not valid",
        status: 401,
      });
    } else {
      // Handle the case where the token is not provided or is not in the correct format
      return NextResponse.json(
        { message: "Token invalid or expired" },
        { status: 401 },
      );
    }
  }
}

export async function PATCH(req: Request) {
  // update function
  const user = await getUser();
  const { id, minThreshold, maxThreshold } = await req.json();
  if (user) {
    const updatedCrop = await db.environmentParameterThreshold.update({
      where: {
        id,
      },
      data: {
        minThreshold: minThreshold,
        maxThreshold: maxThreshold,
      },
    });
    return NextResponse.json(updatedCrop);
  }
  return NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    },
  );
}

export async function DELETE(req: Request) {
  // update function
  const user = await getUser();
  const { searchParams } = new URL(req.url);
  const cropId = searchParams.get("cropId");
  if (user) {
    const deletedCrop = await db.environmentParameterThreshold.delete({
      where: {
        id: cropId,
      },
    });
    return NextResponse.json(deletedCrop);
  }
  return NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    },
  );
}

export async function POST(req: Request) {
  const user = await getUser();
  const { name, type, minThreshold, maxThreshold } = await req.json();
  console.log(name, type, minThreshold, maxThreshold);
  if (user) {
    const addedCrop = await db.environmentParameterThreshold.create({
      data: {
        name,
        type,
        minThreshold,
        maxThreshold,
      },
    });
    console.log(addedCrop);
    return NextResponse.json(addedCrop);
  }
  return NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    },
  );
}
