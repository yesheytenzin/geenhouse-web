import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import { generateGreenhouseCode } from "./(code)/greenhouse";
import { generateIrrigationCode } from "./(code)/irrigation";

export async function POST(request: NextRequest) {
  const user = await getUser();
  const credentials = await request.json();

  if (user) {
    const code =
      credentials.type === "greenhouse"
        ? generateGreenhouseCode(credentials)
        : generateIrrigationCode(credentials);
    return NextResponse.json(code);
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
