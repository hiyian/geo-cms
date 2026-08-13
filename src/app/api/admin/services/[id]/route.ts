import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const features = Array.isArray(body.features)
    ? body.features
    : String(body.features || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean);

  const updated = await prisma.service.update({
    where: { id },
    data: {
      title: String(body.title || ""),
      summary: String(body.summary || ""),
      description: String(body.description || ""),
      features: JSON.stringify(features),
      accent: String(body.accent || "cyan"),
      badge: String(body.badge || ""),
      href: String(body.href || "/contact"),
      sortOrder: Number(body.sortOrder || 0),
      published: Boolean(body.published),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
