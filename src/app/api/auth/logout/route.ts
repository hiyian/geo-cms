import { NextResponse } from "next/server";
import { clearSessionCookie, isHttpsRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  return clearSessionCookie(response, isHttpsRequest(request));
}
