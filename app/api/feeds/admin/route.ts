import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = await getUser();
  const userExists = await db.user.findUnique({
    where: {
      username: user?.email as string,
    },
  });
  const newsFeed = await db.newsFeeds.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      author: true,
    },
  });
  return NextResponse.json(newsFeed, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const res = await db.newsFeeds.delete({
    where: {
      id: id as string,
    },
  });
  if (res) {
    return NextResponse.json(
      { message: "News Feed Deleted Successfully" },
      { status: 200 },
    );
  }
  return NextResponse.json({ message: "News Feed Not Found" }, { status: 404 });
}
