import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const created = await prisma.faq.create({
    data: {
      question: String(body.question || "新问题"),
      answer: String(body.answer || ""),
      sortOrder: Number(body.sortOrder || 0),
      published: Boolean(body.published ?? true),
    },
  });
  return NextResponse.json(created);
}
