import { NextResponse } from "next/server";
import {
  attachSessionCookie,
  createSessionToken,
  verifyAdmin,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "服务器未配置 DATABASE_URL" },
        { status: 500 },
      );
    }
    if (!process.env.AUTH_SECRET) {
      return NextResponse.json(
        { error: "服务器未配置 AUTH_SECRET" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    const user = await verifyAdmin(username, password);
    if (!user) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    const token = await createSessionToken(user.id, user.username);
    const response = NextResponse.json({ ok: true });
    return attachSessionCookie(response, token);
  } catch (error) {
    console.error("login failed:", error);
    return NextResponse.json(
      {
        error: "登录失败",
        detail: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 },
    );
  }
}
