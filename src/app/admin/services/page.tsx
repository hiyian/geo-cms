import { prisma } from "@/lib/db";
import { parseServiceDetail, getServicesPageHero } from "@/lib/content";
import { ServicesManager } from "./ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const [services, hero] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    getServicesPageHero(),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">服务管理</h1>
      <p className="mb-8 text-slate-500">
        编辑内容会同步到前台 /services（页头 + 各服务区块）
      </p>
      <ServicesManager
        key={services.map((s) => `${s.id}-${s.updatedAt.getTime()}`).join("|")}
        initialHero={hero}
        initial={services.map((s) => {
          const detail = parseServiceDetail(s.detail);
          let features: string[] = [];
          try {
            features = JSON.parse(s.features);
          } catch {
            features = [];
          }
          return {
            id: s.id,
            title: s.title,
            summary: s.summary,
            description: s.description,
            featuresText: features.join("\n"),
            layout: detail.layout,
            scenariosTitle: detail.scenariosTitle || "",
            scenariosText: (detail.scenarios || []).join("\n"),
            contentsTitle: detail.contentsTitle || "服务内容",
            promiseTitle: detail.promiseTitle || "",
            promise: detail.promise || s.description || "",
            dimensionsText: (detail.dimensions || []).join("\n"),
            reportItemsText: (detail.reportItems || []).join("\n"),
            ctaText: detail.ctaText || "",
            accent: s.accent,
            badge: s.badge,
            href: s.href,
            sortOrder: s.sortOrder,
            published: s.published,
          };
        })}
      />
    </div>
  );
}
