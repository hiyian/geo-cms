import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

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

  const created = await prisma.caseStudy.create({
    data: {
      title: String(body.title || "新案例"),
      industry: String(body.industry || ""),
      summary: String(body.summary || ""),
      result: String(body.result || ""),
      metrics: JSON.stringify(metrics),
      sortOrder: Number(body.sortOrder || 0),
      published: Boolean(body.published ?? true),
    },
  });
  return NextResponse.json(created);
}
