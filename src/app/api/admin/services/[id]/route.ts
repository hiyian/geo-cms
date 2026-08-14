import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function normalizeLines(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  return String(value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildDetail(body: Record<string, unknown>) {
  if (typeof body.detail === "string") {
    try {
      JSON.parse(body.detail);
      return body.detail;
    } catch {
      /* fall through */
    }
  }
  if (body.detail && typeof body.detail === "object") {
    return JSON.stringify(body.detail);
  }
  return JSON.stringify({
    layout: String(body.layout || "default"),
    scenariosTitle: String(body.scenariosTitle || ""),
    scenarios: normalizeLines(body.scenarios),
    contentsTitle: String(body.contentsTitle || "服务内容"),
    promiseTitle: String(body.promiseTitle || ""),
    promise: String(body.promise || body.description || ""),
    dimensions: normalizeLines(body.dimensions),
    reportItems: normalizeLines(body.reportItems),
    ctaText: String(body.ctaText || ""),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const features = normalizeLines(body.features);

  const updated = await prisma.service.update({
    where: { id },
    data: {
      title: String(body.title || ""),
      summary: String(body.summary || ""),
      description: String(body.description || body.promise || ""),
      features: JSON.stringify(features),
      detail: buildDetail(body),
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
