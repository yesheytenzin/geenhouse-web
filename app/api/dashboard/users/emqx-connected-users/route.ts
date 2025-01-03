import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { error } from "@/utils/logger";

const reqURL = `${env.EMQX_BASE_URL}/clients?_page=1&_limit=50`;
const getConnectedUsers = async () => {
  const res = await fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Basic " + btoa(`${env.EMQX_APP_ID}:${env.EMQX_APP_SECRET}`),
    },
    next: {
      revalidate: 5,
    },
  });
  if (!res.ok) {
    const result = await res.json();
    error(result);
    return;
  }
  const result = await res.json();
  return result?.meta?.count;
};

export async function GET(request: NextRequest) {
  const count = await getConnectedUsers();
  return NextResponse.json(count);
}
