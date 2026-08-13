import { prisma } from "@/lib/db";
import { FaqsManager } from "./FaqsManager";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">FAQ 管理</h1>
      <p className="mb-8 text-slate-500">常见问题问答</p>
      <FaqsManager initial={faqs} />
    </div>
  );
}
