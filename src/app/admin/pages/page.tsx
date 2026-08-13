import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPagesIndex() {
  const pages = await prisma.pageContent.findMany({
    where: { slug: { in: ["home", "about", "contact"] } },
    orderBy: { slug: "asc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">页面内容</h1>
      <p className="mb-8 text-slate-500">首页建议用「首页内容」入口；此处可编辑关于/联系页 JSON</p>
      <div className="space-y-3">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={p.slug === "home" ? "/admin/home" : `/admin/pages/${p.slug}`}
            className="admin-card block hover:border-cyan-400/40"
          >
            <div className="font-bold text-white">{p.title}</div>
            <div className="text-xs text-slate-500">slug: {p.slug}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
