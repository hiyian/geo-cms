import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle2,
  CircleX,
  Layers,
  Search,
} from "lucide-react";
import { AnimatedChatDemo } from "@/components/home/AnimatedChatDemo";
import { FadeIn } from "@/components/site/FadeIn";
import { FaqList } from "@/components/site/FaqList";
import type { HomePageData } from "@/lib/types";

type FaqItem = { id: string; question: string; answer: string };

const iconMap = {
  "x-circle": CircleX,
  search: Search,
  layers: Layers,
  bot: Bot,
};

const painAccent: Record<string, { card: string; num: string; icon: string; bar: string }> = {
  red: {
    card: "from-red-500/15 via-red-600/5 to-transparent group-hover:border-red-500/40",
    num: "text-red-500/20 dark:text-red-500/30",
    icon: "text-red-500",
    bar: "bg-red-400",
  },
  orange: {
    card: "from-orange-500/15 via-orange-600/5 to-transparent group-hover:border-orange-500/40",
    num: "text-orange-500/20 dark:text-orange-500/30",
    icon: "text-orange-500",
    bar: "bg-orange-400",
  },
  amber: {
    card: "from-amber-500/15 via-amber-600/5 to-transparent group-hover:border-amber-500/40",
    num: "text-amber-500/20 dark:text-amber-500/30",
    icon: "text-amber-500",
    bar: "bg-amber-400",
  },
  rose: {
    card: "from-rose-500/15 via-rose-600/5 to-transparent group-hover:border-rose-500/40",
    num: "text-rose-500/20 dark:text-rose-500/30",
    icon: "text-rose-500",
    bar: "bg-rose-400",
  },
};

export function HomePageView({
  data,
  faqs,
}: {
  data: HomePageData;
  faqs: FaqItem[];
}) {
  const { hero, pain, timeline, migration, servicesSection, stats, faqSection, cta } = data;

  return (
    <div className="home-container overflow-x-hidden bg-white text-slate-600 transition-colors selection:bg-blue-200 selection:text-slate-900 dark:bg-navy-900 dark:text-slate-300 dark:selection:bg-cyan-400 dark:selection:text-navy-900">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden bg-white dark:bg-navy-900">
          <div className="pointer-events-none absolute top-[-20%] left-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-blue-200/40 blur-[120px] dark:bg-purple-900/30" />
          <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[50%] w-[50%] animate-pulse rounded-full bg-violet-200/40 blur-[120px] dark:bg-cyan-900/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="items-center lg:grid lg:grid-cols-2 lg:gap-16">
            <FadeIn className="text-center lg:text-left">
              {hero.eyebrow ? (
                <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">
                  {hero.eyebrow}
                </div>
              ) : null}
              <h1 className="mb-8 text-4xl leading-tight font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white">
                {hero.titleBefore}{" "}
                <span className="accent-gradient">{hero.titleHighlight}</span>
                <br />
                {hero.titleAfter}
              </h1>
              <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-500 md:text-xl lg:mx-0 dark:text-slate-400">
                {hero.subtitle}
              </p>
              <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 dark:bg-primary dark:text-navy-900 dark:shadow-[0_0_20px_rgba(100,255,218,0.35)] dark:hover:bg-primary-hover"
                >
                  {hero.primaryCta.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  {hero.secondaryCta.text}
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {hero.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn className="relative mt-12 flex w-full justify-center lg:mt-0" x={40} y={0}>
              <AnimatedChatDemo demos={hero.demos} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* GEO Covers - geook style */}
      <section className="relative py-24 dark:bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 text-center">
            <div className="mb-3 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-cyan-400">
              {servicesSection.badge}
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              {servicesSection.title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-500 dark:text-slate-400">
              {servicesSection.subtitle}
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicesSection.covers.map((cover, idx) => (
              <FadeIn key={cover.title} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-navy-800/50 dark:hover:border-cyan-400/40">
                  <div className="mb-3 text-sm font-bold text-blue-600 dark:text-cyan-400">
                    0{idx + 1}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                    {cover.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {cover.description}
                  </p>
                  <ul className="space-y-2">
                    {cover.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-cyan-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="relative overflow-hidden bg-slate-50 py-28 dark:bg-navy-800">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16 text-center">
            <span className="mb-6 inline-block rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {pain.badge}
            </span>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              {pain.titleBefore}{" "}
              <span className="bg-linear-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                {pain.titleHighlight}
              </span>
              {pain.titleAfter}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-500 dark:text-slate-400">
              {pain.subtitle}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pain.items.map((item, idx) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || CircleX;
              const style = painAccent[item.accent] || painAccent.red;
              return (
                <FadeIn key={item.id} delay={idx * 0.06}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br p-8 transition dark:border-white/5 ${style.card}`}
                  >
                    <span
                      className={`pointer-events-none absolute -top-4 -right-4 select-none text-[120px] leading-none font-black ${style.num}`}
                    >
                      {item.id}
                    </span>
                    <div className="relative z-10 flex items-start gap-5">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-navy-900/80 ${style.icon}`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-500 md:text-base dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full ${style.bar}`}
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 text-center">
            <span className="mb-6 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
              {timeline.badge}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              {timeline.titleBefore}
              <span className="accent-gradient">{timeline.titleHighlight}</span>
              {timeline.titleAfter}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-2">
            {timeline.items.map((item, idx) => (
              <FadeIn key={item.year} delay={idx * 0.05}>
                <div
                  className={`relative flex flex-col items-center rounded-xl p-4 text-center ${
                    item.current
                      ? "scale-105 border border-blue-300 bg-blue-50 dark:border-cyan-500/30 dark:bg-linear-to-b dark:from-cyan-500/20 dark:to-purple-500/10"
                      : "border border-transparent bg-slate-50 dark:bg-white/2"
                  }`}
                >
                  <div
                    className={`mb-3 h-4 w-4 rounded-full ${
                      item.current
                        ? "animate-pulse bg-linear-to-r from-cyan-400 to-purple-500 ring-4 ring-cyan-400/30"
                        : "bg-linear-to-r from-blue-400 to-blue-600"
                    }`}
                  />
                  <div
                    className={`text-2xl font-black ${
                      item.current ? "accent-gradient" : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {item.year}
                  </div>
                  <div
                    className={`mt-1 text-sm font-bold ${
                      item.current
                        ? "text-blue-600 dark:text-cyan-400"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{item.subtitle}</div>
                  {item.current && (
                    <div className="absolute -top-2 -right-2 rounded-full bg-linear-to-r from-blue-500 to-violet-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      NOW
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14 text-center">
            <Link
              href={timeline.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white transition hover:shadow-lg hover:shadow-blue-500/30"
            >
              {timeline.ctaButton}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Migration */}
      <section className="relative overflow-hidden bg-slate-50 py-28 dark:bg-navy-800/40">
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn y={30}>
            <h2 className="mb-8 text-3xl leading-tight font-bold text-slate-900 md:text-5xl dark:text-white">
              当用户问AI
              <span className="mx-2 inline-block rounded-xl border border-blue-200 bg-blue-50 px-4 py-1 dark:border-cyan-400/30 dark:bg-cyan-500/10">
                <span className="accent-gradient font-black">
                  &quot;{migration.quotePrompt}&quot;
                </span>
              </span>
              {migration.titleMiddle}
              <span className="mx-2 bg-linear-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {migration.recommend}
              </span>
              ，还是
              <span className="mx-2 bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent line-through">
                {migration.invisible}
              </span>
              ？
            </h2>
            <p className="mb-10 text-xl text-slate-500 dark:text-slate-400">{migration.subtitle}</p>
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              {migration.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/90"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-12 border-t border-slate-200 pt-8 dark:border-white/5">
              {migration.stats.map((s) => (
                <div key={s.label}>
                  <div className="accent-gradient text-3xl font-bold md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              {stats.titleBefore}{" "}
              <span className="accent-gradient">{stats.titleHighlight}</span>{" "}
              {stats.titleAfter}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">{stats.subtitle}</p>
          </div>
          <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.items.map((item, idx) => (
              <FadeIn key={item.label} delay={idx * 0.05}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-white/5 dark:bg-navy-800/50">
                  <div className="accent-gradient mb-2 text-4xl font-bold md:text-5xl">
                    {item.value}
                  </div>
                  <div className="mb-1 font-medium text-slate-900 dark:text-white">{item.label}</div>
                  <div className="text-sm text-slate-400">{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-navy-800/50">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-linear-to-br dark:from-cyan-500/20 dark:to-purple-500/20">
                  <Award className="text-blue-600 dark:text-cyan-400" size={40} />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                    {stats.methodTitle}
                  </h3>
                  <p className="mb-5 leading-relaxed text-slate-500 dark:text-slate-400">
                    {stats.methodDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stats.methodTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 bg-slate-50 py-24 dark:bg-navy-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="mb-3 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-cyan-400">
              FAQ
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              {faqSection.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{faqSection.subtitle}</p>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
            {cta.titleBefore}{" "}
            <span className="accent-gradient">{cta.titleHighlight}</span>
            {cta.titleAfter}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            {cta.subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={cta.buttonHref}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 dark:bg-primary dark:text-navy-900 dark:hover:bg-primary-hover"
            >
              {cta.buttonText}
              <ArrowRight className="ml-2" />
            </Link>
            {cta.phone ? (
              <a
                href={`tel:${cta.phone.replace(/\s+/g, "")}`}
                className="text-lg font-semibold text-slate-700 dark:text-slate-200"
              >
                {cta.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
