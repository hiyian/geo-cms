import { prisma } from "@/lib/db";
import { ServicesManager } from "./ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">服务管理</h1>
      <p className="mb-8 text-slate-500">新增、编辑、删除服务卡片</p>
      <ServicesManager
        initial={services.map((s) => ({
          ...s,
          featuresText: JSON.parse(s.features).join("\n"),
        }))}
      />
    </div>
  );
}
