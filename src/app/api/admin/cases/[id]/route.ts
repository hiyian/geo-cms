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
  const metrics = Array.isArray(body.metrics)
    ? body.metrics
    : String(body.metrics || "")
        .split("\n")
        .map((line: string) => line.trim())
        .filter(Boolean)
        .map((line: string) => {
          const [label, value] = line.split("|").map((s) => s.trim());
          return { label: label || "", value: value || "" };
        });

  const updated = await prisma.caseStudy.update({
    where: { id },
    data: {
      title: String(body.title || ""),
      industry: String(body.industry || ""),
      summary: String(body.summary || ""),
      result: String(body.result || ""),
      metrics: JSON.stringify(metrics),
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
  await prisma.caseStudy.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
