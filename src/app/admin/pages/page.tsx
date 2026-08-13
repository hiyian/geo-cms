import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPagesIndex() {
  const pages = await prisma.pageContent.findMany({
    where: { slug: { in: ["about", "contact"] } },
    orderBy: { slug: "asc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">其他页面</h1>
      <p className="mb-8 text-slate-500">
        关于我们、联系我们等页面文案。首页请到左侧「首页内容」编辑。
      </p>
      <div className="space-y-3">
        <Link href="/admin/home" className="admin-card block hover:border-cyan-400/40">
          <div className="font-bold text-white">首页内容</div>
          <div className="text-xs text-slate-500">首屏、聊天演示、痛点、能力卡片等</div>
        </Link>
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/pages/${p.slug}`}
            className="admin-card block hover:border-cyan-400/40"
          >
            <div className="font-bold text-white">{p.title}</div>
            <div className="text-xs text-slate-500">表单编辑页面文案</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
