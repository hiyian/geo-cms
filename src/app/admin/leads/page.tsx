import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  name: string;
  phone: string;
  company: string;
  message: string;
  createdAt: string;
};

export default async function AdminLeadsPage() {
  const page = await prisma.pageContent.findUnique({ where: { slug: "leads-inbox" } });
  const leads: Lead[] = page ? JSON.parse(page.data) : [];

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">线索收件箱</h1>
      <p className="mb-8 text-slate-500">来自联系页的表单提交</p>

      {leads.length === 0 ? (
        <div className="admin-card text-slate-500">暂无线索</div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="admin-card">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-white">
                  {lead.name} · {lead.phone}
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(lead.createdAt).toLocaleString("zh-CN")}
                </div>
              </div>
              {lead.company ? (
                <div className="mb-1 text-sm text-slate-400">公司：{lead.company}</div>
              ) : null}
              <div className="text-sm text-slate-300 whitespace-pre-wrap">
                {lead.message || "（无留言）"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
