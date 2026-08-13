import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const data = typeof body.data === "string" ? body.data : JSON.stringify(body.data);
  const title = String(body.title || slug);

  // Validate JSON
  try {
    JSON.parse(data);
  } catch {
    return NextResponse.json({ error: "JSON 格式无效" }, { status: 400 });
  }

  const page = await prisma.pageContent.upsert({
    where: { slug },
    update: { data, title },
    create: { slug, data, title },
  });

  return NextResponse.json(page);
}
