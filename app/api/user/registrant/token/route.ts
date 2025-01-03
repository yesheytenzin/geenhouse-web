import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import { generateUniqueToken } from "@/utils/token-generator";
import { db } from "@/lib/db";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (user) {
    const {
      tokenCount,
      remarks,
    }: {
      tokenCount: number;
      remarks: string;
    } = await request.json();
    let tokens = new Set();
    for (let i = 0; i < tokenCount; i++) {
      const token = generateUniqueToken();
      tokens.add(token);
    }
    const payloads = Array.from(tokens).map((token: string) => ({
      token,
      remarks, // Add remarks if needed
    }));
    const res = await db.registrantToken.createMany({
      data: payloads,
    });
    if (res) {
      return NextResponse.json(
        {
          message: `${tokens.size} Token(s) has been generated successfully`,
        },
        {
          status: 200,
        },
      );
    }
    return NextResponse.json(
      {
        message: `Failed while generating the token(s)`,
      },
      {
        status: 200,
      },
    );
  }
  return NextResponse.json(
    {
      message: "You are forbidden from requested operation",
    },
    {
      status: 403,
    },
  );
}

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (user) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    try {
      const [tokens, totalCount] = await Promise.all([
        db.registrantToken.findMany({
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        db.registrantToken.count(),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return NextResponse.json(
        {
          tokens,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: totalCount,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching tokens" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: "You are forbidden from requested operation" },
    { status: 403 },
  );
}

export async function PATCH(request: NextRequest) {
  const { tokenId } = await request.json();
  if (tokenId != null) {
    const validRegToken = await db.registrantToken.findUnique({
      // @ts-ignore
      where: {
        token: tokenId,
      },
    });
    if (validRegToken) {
      if (!validRegToken.hasUser) {
        return NextResponse.json(
          {
            message: "Registrant Token verified",
          },
          {
            status: 200,
          },
        );
      }
      return NextResponse.json(
        {
          message: "Registrant Token has already been used",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json(
        {
          message: "Not a valid registrant token",
        },
        {
          status: 404,
        },
      );
    }
  }
  return NextResponse.json(
    {
      message: "Empty Registrant number",
    },
    {
      status: 400,
    },
  );
}

export async function DELETE(request: NextRequest) {
  const user = await getUser();
  if (user) {
    const tokenId = request.nextUrl.searchParams.get("id");

    try {
      const deletedToken = await db.registrantToken.delete({
        where: { id: tokenId },
      });

      if (deletedToken) {
        return NextResponse.json(
          { message: "Token revoked successfully" },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { message: "Token not found" },
          { status: 404 },
        );
      }
    } catch (error) {
      console.error("Error revoking token:", error);
      return NextResponse.json(
        { message: "Error revoking token" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: "You are forbidden from requested operation" },
    { status: 403 },
  );
}
