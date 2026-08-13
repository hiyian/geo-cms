import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const slug =
    String(body.slug || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") || `post-${Date.now()}`;

  const created = await prisma.blogPost.create({
    data: {
      title: String(body.title || "新文章"),
      slug,
      excerpt: String(body.excerpt || ""),
      content: String(body.content || ""),
      coverLabel: String(body.coverLabel || "GEO"),
      published: Boolean(body.published ?? true),
    },
  });
  return NextResponse.json(created);
}
