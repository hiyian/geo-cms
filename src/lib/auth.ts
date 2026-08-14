import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const COOKIE_NAME = "geocms_session";

function sessionCookieOptions(secure?: boolean) {
  // HTTP (宝塔 :8080) 不能用 Secure，否则浏览器不存 Cookie，登录后会被踢回登录页
  const useSecure =
    typeof secure === "boolean"
      ? secure
      : process.env.COOKIE_SECURE === "true" ||
        process.env.COOKIE_SECURE === "1";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: useSecure,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

/** Detect https from proxy headers or request URL. */
export function isHttpsRequest(request: Request) {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0].trim() === "https";
  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyAdmin(username: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export async function createSessionToken(userId: string, username: string) {
  return new SignJWT({ sub: userId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

/** Prefer setting cookies on the NextResponse in Route Handlers. */
export function attachSessionCookie(
  response: NextResponse,
  token: string,
  secure = false,
) {
  response.cookies.set(COOKIE_NAME, token, sessionCookieOptions(secure));
  return response;
}

export async function createSession(userId: string, username: string) {
  const token = await createSessionToken(userId, username);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, sessionCookieOptions(false));
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function clearSessionCookie(response: NextResponse, secure = false) {
  response.cookies.set(COOKIE_NAME, "", {
    ...sessionCookieOptions(secure),
    maxAge: 0,
  });
  return response;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || typeof payload.username !== "string") return null;
    return { userId: payload.sub, username: payload.username };
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
