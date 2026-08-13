import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [services, cases, posts, faqs, leadsPage] = await Promise.all([
    prisma.service.count(),
    prisma.caseStudy.count(),
    prisma.blogPost.count(),
    prisma.faq.count(),
    prisma.pageContent.findUnique({ where: { slug: "leads-inbox" } }),
  ]);

  const leads = leadsPage ? (JSON.parse(leadsPage.data) as unknown[]) : [];

  const cards = [
    { label: "服务", value: services, href: "/admin/services" },
    { label: "案例", value: cases, href: "/admin/cases" },
    { label: "博客", value: posts, href: "/admin/blog" },
    { label: "FAQ", value: faqs, href: "/admin/faqs" },
    { label: "询盘", value: leads.length, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">概览</h1>
      <p className="mb-8 text-slate-500">快捷管理站点内容，修改后前台即时生效。</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="admin-card hover:border-cyan-400/40">
            <div className="text-3xl font-bold text-cyan-300">{card.value}</div>
            <div className="mt-1 text-sm text-slate-400">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="admin-card mt-8">
        <h2 className="mb-3 text-lg font-bold text-white">快速入口</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/home" className="admin-btn-ghost">
            编辑首页文案
          </Link>
          <Link href="/admin/settings" className="admin-btn-ghost">
            修改站点信息
          </Link>
          <Link href="/" className="admin-btn">
            打开前台网站
          </Link>
        </div>
      </div>
    </div>
  );
}
