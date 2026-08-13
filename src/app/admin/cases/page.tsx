import { prisma } from "@/lib/db";
import { CasesManager } from "./CasesManager";

export const dynamic = "force-dynamic";

export default async function AdminCasesPage() {
  const cases = await prisma.caseStudy.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">案例管理</h1>
      <p className="mb-8 text-slate-500">指标格式：每行「标签|数值」，例如：AI提及率|+180%</p>
      <CasesManager
        initial={cases.map((c) => ({
          ...c,
          metricsText: (JSON.parse(c.metrics) as { label: string; value: string }[])
            .map((m) => `${m.label}|${m.value}`)
            .join("\n"),
        }))}
      />
    </div>
  );
}
