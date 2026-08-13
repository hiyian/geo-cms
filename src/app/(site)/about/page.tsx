import { FadeIn } from "@/components/site/FadeIn";
import { getAboutData } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <div className="bg-white pt-32 pb-24 transition-colors dark:bg-navy-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
            {data.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">{data.subtitle}</p>
        </FadeIn>

        <div className="mb-12 space-y-6">
          {data.paragraphs.map((p) => (
            <FadeIn key={p}>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{p}</p>
            </FadeIn>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {data.highlights.map((h, idx) => (
            <FadeIn key={h.title} delay={idx * 0.05}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-navy-800/50">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{h.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{h.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
