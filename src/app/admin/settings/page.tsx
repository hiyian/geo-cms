import { prisma } from "@/lib/db";
import { PasswordForm } from "./PasswordForm";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findUniqueOrThrow({ where: { id: "default" } });
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">站点设置</h1>
      <p className="mb-8 text-slate-500">品牌名、联系方式、SEO 等信息</p>
      <SettingsForm settings={settings} />
      <PasswordForm />
    </div>
  );
}
