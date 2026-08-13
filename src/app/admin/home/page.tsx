import { prisma } from "@/lib/db";
import { HomeJsonEditor } from "./HomeJsonEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const page = await prisma.pageContent.findUniqueOrThrow({ where: { slug: "home" } });
  const pretty = JSON.stringify(JSON.parse(page.data), null, 2);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">首页内容</h1>
      <p className="mb-8 text-slate-500">
        编辑 Hero / 痛点 / 时间线 / 数据 / CTA 等区块（JSON）。保存后刷新前台即可。
      </p>
      <HomeJsonEditor initial={pretty} />
    </div>
  );
}
