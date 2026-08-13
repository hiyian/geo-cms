import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import type { AboutPageData, ContactPageData } from "@/lib/types";
import { AboutFormEditor } from "../AboutFormEditor";
import { ContactFormEditor } from "../ContactFormEditor";

export const dynamic = "force-dynamic";

export default async function AdminPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "home") redirect("/admin/home");
  if (slug === "leads-inbox") notFound();

  const page = await prisma.pageContent.findUnique({ where: { slug } });
  if (!page) notFound();

  const data = JSON.parse(page.data);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">编辑：{page.title}</h1>
      <p className="mb-8 text-slate-500">用表单修改页面文案，保存后前台即时生效。</p>
      {slug === "about" ? (
        <AboutFormEditor initial={data as AboutPageData} />
      ) : slug === "contact" ? (
        <ContactFormEditor initial={data as ContactPageData} />
      ) : (
        <div className="admin-card text-slate-400">暂不支持该页面的表单编辑。</div>
      )}
    </div>
  );
}
