import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const updated = await prisma.siteSetting.update({
    where: { id: "default" },
    data: {
      siteName: String(body.siteName || ""),
      logoText: String(body.logoText || ""),
      tagline: String(body.tagline || ""),
      phone: String(body.phone || ""),
      email: String(body.email || ""),
      address: String(body.address || ""),
      copyright: String(body.copyright || ""),
      icp: String(body.icp || ""),
      navCtaText: String(body.navCtaText || ""),
      navCtaHref: String(body.navCtaHref || ""),
      seoTitle: String(body.seoTitle || ""),
      seoDescription: String(body.seoDescription || ""),
      seoKeywords: String(body.seoKeywords || ""),
    },
  });

  return NextResponse.json(updated);
}
