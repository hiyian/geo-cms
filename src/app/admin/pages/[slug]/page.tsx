import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageJsonEditor } from "./PageJsonEditor";

export const dynamic = "force-dynamic";

export default async function AdminPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "home") {
    // Prefer dedicated home editor
  }
  const page = await prisma.pageContent.findUnique({ where: { slug } });
  if (!page || slug === "leads-inbox") notFound();

  const pretty = JSON.stringify(JSON.parse(page.data), null, 2);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">编辑：{page.title}</h1>
      <p className="mb-8 text-slate-500">slug: {slug}</p>
      <PageJsonEditor slug={slug} title={page.title} initial={pretty} />
    </div>
  );
}
