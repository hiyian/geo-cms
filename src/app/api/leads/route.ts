import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const company = String(body.company || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone) {
      return NextResponse.json({ error: "姓名和手机号必填" }, { status: 400 });
    }

    // Store lead as a blog-like content stub is overkill; use PageContent inbox JSON append
    const inbox = await prisma.pageContent.findUnique({ where: { slug: "leads-inbox" } });
    const leads = inbox ? (JSON.parse(inbox.data) as unknown[]) : [];
    leads.unshift({
      id: crypto.randomUUID(),
      name,
      phone,
      company,
      message,
      createdAt: new Date().toISOString(),
    });

    await prisma.pageContent.upsert({
      where: { slug: "leads-inbox" },
      update: { data: JSON.stringify(leads), title: "询盘" },
      create: {
        slug: "leads-inbox",
        title: "询盘",
        data: JSON.stringify(leads),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
