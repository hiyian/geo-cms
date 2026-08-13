import Link from "next/link";
import { MapPin } from "lucide-react";

type Props = {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  copyright: string;
  icp: string;
};

export function Footer({
  siteName,
  tagline,
  phone,
  email,
  address,
  copyright,
  icp,
}: Props) {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 text-slate-500 transition-colors dark:border-white/5 dark:bg-navy-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <div className="mb-5 text-xl font-black text-slate-900 dark:text-white">
              <span className="font-light">{siteName.replace("GEO", "")}</span>
              <span className="accent-gradient">GEO</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              专注 AI 生成式引擎优化 (GEO)，助力企业抢占 AI 流量入口，构筑获客新阵地。
              {tagline ? ` ${tagline}` : ""}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-white">快速导航</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["/", "首页"],
                ["/about", "关于我们"],
                ["/services", "GEO服务"],
                ["/blog", "GEO知识库"],
                ["/contact", "联系我们"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-blue-600 dark:hover:text-cyan-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-white">核心服务</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="transition hover:text-blue-600 dark:hover:text-cyan-400">
                  GEO生成式引擎优化
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-blue-600 dark:hover:text-cyan-400">
                  品牌信息合规诊断
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-blue-600 dark:hover:text-cyan-400">
                  免费GEO诊断
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-white">联系我们</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="font-medium text-slate-900 dark:text-white">{phone}</div>
                <div className="text-xs text-slate-400">工作日 9:00-18:00</div>
              </li>
              <li>
                <div className="font-medium text-slate-900 dark:text-white">{email}</div>
                <div className="text-xs text-slate-400">商务合作邮箱</div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-500" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">{address}</div>
                  <div className="text-xs text-slate-400">公司地址</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-400 sm:px-6 md:flex-row lg:px-8">
          <p>{copyright}</p>
          {icp ? <div className="flex items-center gap-6">{icp}</div> : null}
        </div>
      </div>
    </footer>
  );
}
