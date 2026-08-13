import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const features = Array.isArray(body.features)
    ? body.features
    : String(body.features || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean);

  const created = await prisma.service.create({
    data: {
      title: String(body.title || "新服务"),
      summary: String(body.summary || ""),
      description: String(body.description || ""),
      features: JSON.stringify(features),
      accent: String(body.accent || "cyan"),
      badge: String(body.badge || ""),
      href: String(body.href || "/contact"),
      sortOrder: Number(body.sortOrder || 0),
      published: Boolean(body.published ?? true),
    },
  });

  return NextResponse.json(created);
}
