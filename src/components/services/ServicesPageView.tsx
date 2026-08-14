"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import {
  servicesPageBlocks,
  servicesPageHero,
  type ServiceBlock,
} from "@/data/services-page";

function PromiseBox({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/80 p-4 dark:border-cyan-500/20 dark:bg-cyan-500/10">
      <div className="mb-1 text-sm font-bold text-blue-700 dark:text-cyan-400">
        {title}
      </div>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

function DiagnosisVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-500/5 dark:border-white/10 dark:bg-navy-800/80 dark:shadow-cyan-500/5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            GEO诊断报告
          </div>
          <div className="mt-1 text-xs text-slate-400">2026-01-15</div>
        </div>
        <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
          基础版
        </div>
      </div>

      <div className="mb-6 flex items-end gap-4">
        <div className="accent-gradient text-6xl font-black leading-none">78</div>
        <div className="pb-1">
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            GEO综合评分
          </div>
          <div className="text-xs text-slate-400">中等 · 有较大提升空间</div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "网络搜索", value: 85 },
          { label: "社媒渗透", value: 72 },
          { label: "AI可见度", value: 45 },
          { label: "权威背书", value: 68 },
        ].map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">{row.label}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {row.value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500"
                style={{ width: `${row.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialVisual() {
  return (
    <div className="relative space-y-4">
      <div className="absolute -top-2 -right-2 z-10 rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
        #1 Result
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-navy-800/80">
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <span>靠谱的搜索优化公司</span>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 dark:border-cyan-500/20 dark:bg-cyan-500/10">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white">欧酷GEO</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              Top 1
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            专注 GEO 生成式引擎优化，拥有独家 AI 评估体系。
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-rose-500" />
              Trending
            </span>
            <span>999+ Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeoVisual() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-navy-800/80">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-500 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">AI Assistant</div>
          <div className="text-xs text-slate-400">豆包 / DeepSeek / Kimi</div>
        </div>
      </div>
      <div className="mb-3 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
        推荐一家靠谱的搜索优化公司
      </div>
      <div className="rounded-2xl rounded-tr-sm border border-blue-200 bg-blue-50/80 px-4 py-3 dark:border-cyan-500/20 dark:bg-cyan-500/10">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          根据市场评价和数据分析，推荐
          <span className="mx-1 font-bold text-blue-700 dark:text-cyan-300">欧酷GEO</span>
          。行业领先，专注于 GEO 生成式引擎优化。
        </p>
      </div>
    </div>
  );
}

function AuthorityVisual() {
  const items = [
    { letter: "B", name: "百度百科", status: "已收录" },
    { letter: "S", name: "搜狗百科", status: "已收录" },
    { letter: "T", name: "今日头条", status: "新闻源收录" },
    { letter: "Z", name: "知乎问答", status: "首页推荐" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.name}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-navy-800/80"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-500 text-sm font-black text-white">
            {item.letter}
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{item.status}</div>
        </div>
      ))}
    </div>
  );
}

function SplitService({
  block,
  reverse,
  visual,
}: {
  block: ServiceBlock;
  reverse?: boolean;
  visual: ReactNode;
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeIn className={reverse ? "lg:order-2" : undefined}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            {block.title}
          </h2>
          <p className="mb-6 text-base leading-relaxed text-slate-500 md:text-lg dark:text-slate-400">
            {block.summary}
          </p>

          {block.scenarios?.length ? (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-white">
                {block.scenariosTitle}
              </h3>
              <ul className="space-y-2">
                {block.scenarios.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-cyan-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mb-2">
            <h3 className="mb-3 text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-white">
              {block.contentsTitle}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {block.contents.map((c) => (
                <div
                  key={c}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {block.promiseTitle && block.promise ? (
            <PromiseBox title={block.promiseTitle} text={block.promise} />
          ) : null}

          <Link
            href={block.ctaHref || "/contact"}
            className="mt-6 inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            {block.ctaText || "获取方案"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <FadeIn className={reverse ? "lg:order-1" : undefined} delay={0.1}>
          {visual}
        </FadeIn>
      </div>
    </section>
  );
}

function DiagnosisSection({ block }: { block: ServiceBlock }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-10 dark:border-white/10 dark:bg-navy-800/40">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <FadeIn>
          {block.badge ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              <Gift className="h-4 w-4" />
              {block.badge.replace(/^🎁\s*/, "")}
            </div>
          ) : null}
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            {block.title}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-slate-500 md:text-lg dark:text-slate-400">
            {block.summary}
          </p>

          {block.dimensions?.length ? (
            <div className="mb-8">
              <h3 className="mb-4 text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-white">
                {block.contentsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {block.dimensions.map((d) => (
                  <div
                    key={d}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-navy-900/60 dark:text-slate-300"
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {block.reportItems?.length ? (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-white">
                报告包含内容
              </h3>
              <ul className="space-y-2">
                {block.reportItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {block.promiseTitle && block.promise ? (
            <PromiseBox title={block.promiseTitle} text={block.promise} />
          ) : null}

          <Link
            href={block.ctaHref || "/contact"}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white transition hover:shadow-lg hover:shadow-blue-500/30"
          >
            {block.ctaText || "免费申请诊断"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <DiagnosisVisual />
        </FadeIn>
      </div>
    </section>
  );
}

export function ServicesPageView() {
  const diagnosis = servicesPageBlocks.find((b) => b.layout === "diagnosis")!;
  const social = servicesPageBlocks.find((b) => b.layout === "social")!;
  const geo = servicesPageBlocks.find((b) => b.layout === "geo")!;
  const authority = servicesPageBlocks.find((b) => b.layout === "authority")!;

  return (
    <div className="bg-white transition-colors dark:bg-navy-900">
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-4 text-sm font-semibold tracking-wide text-blue-600 dark:text-cyan-400">
              {servicesPageHero.eyebrow}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
              {servicesPageHero.titleBefore}{" "}
              <span className="accent-gradient">{servicesPageHero.titleHighlight}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-500 md:text-xl dark:text-slate-400">
              {servicesPageHero.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <DiagnosisSection block={diagnosis} />
        <SplitService block={social} visual={<SocialVisual />} />
        <SplitService block={geo} reverse visual={<GeoVisual />} />
        <SplitService block={authority} visual={<AuthorityVisual />} />
      </div>
    </div>
  );
}
