import { FadeIn } from "@/components/site/FadeIn";
import { getPublishedCases, parseMetrics } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await getPublishedCases();

  return (
    <div className="bg-white pt-32 pb-24 transition-colors dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
            成功案例
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">用结果证明 GEO 的价值</p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {cases.map((item, idx) => {
            const metrics = parseMetrics(item.metrics);
            return (
              <FadeIn key={item.id} delay={idx * 0.06}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-navy-800/50 dark:hover:border-cyan-400/40">
                  <div className="mb-4 inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs text-violet-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300">
                    {item.industry}
                  </div>
                  <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{item.summary}</p>
                  <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">{item.result}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/5 dark:bg-white/5"
                      >
                        <div className="accent-gradient text-lg font-bold">{m.value}</div>
                        <div className="text-xs text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
