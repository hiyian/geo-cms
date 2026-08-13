import { prisma } from "@/lib/db";
import { getHomeData } from "@/lib/content";
import { HomeFormEditor } from "./HomeFormEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  // Ensure page exists, then load normalized data
  await prisma.pageContent.findUniqueOrThrow({ where: { slug: "home" } });
  const data = await getHomeData();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">首页内容</h1>
      <p className="mb-8 text-slate-500">
        按区块填写文案即可，保存后刷新前台首页生效。无需编辑 JSON。
      </p>
      <HomeFormEditor initial={data} />
    </div>
  );
}
