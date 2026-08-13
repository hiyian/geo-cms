import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import { getHomeData, getPublishedServices, parseJsonArray } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, home] = await Promise.all([getPublishedServices(), getHomeData()]);

  return (
    <div className="bg-white pt-32 pb-24 transition-colors dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <div className="mb-3 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-cyan-400">
            {home.servicesSection.badge || "GEO服务"}
          </div>
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
            {home.servicesSection.title}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-500 dark:text-slate-400">
            {home.servicesSection.subtitle}
          </p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, idx) => {
            const features = parseJsonArray(service.features);
            return (
              <FadeIn key={service.id} delay={idx * 0.05}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-navy-800/50 dark:hover:border-cyan-400/40">
                  {service.badge ? (
                    <div className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-400">
                      {service.badge}
                    </div>
                  ) : null}
                  <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mb-4 text-slate-500 dark:text-slate-400">{service.summary}</p>
                  <ul className="mb-8 space-y-2">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 mr-2 h-4 w-4 shrink-0 text-blue-500 dark:text-cyan-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center font-bold text-blue-600 hover:text-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    获取方案 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
