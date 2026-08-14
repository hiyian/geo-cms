"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import type { ServiceBlock, ServicesPageHero } from "@/lib/types";

const DIAGNOSIS_METRICS = [
  {
    label: "网络搜索",
    value: 85,
    tip: "官网与资讯源覆盖较好，可持续巩固长尾词入口。",
  },
  {
    label: "社媒渗透",
    value: 72,
    tip: "社媒种草内容有基础，建议加强素人矩阵与话题覆盖。",
  },
  {
    label: "AI可见度",
    value: 45,
    tip: "AI推荐表现偏弱，优先补齐结构化问答与实体信息。",
  },
  {
    label: "权威背书",
    value: 68,
    tip: "百科与媒体资产可继续沉淀，提升知识图谱权重。",
  },
] as const;

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

function AnimatedScore({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [text, setText] = useState("0");

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(String(v)));
    motionValue.set(value);
    return unsub;
  }, [display, motionValue, value]);

  return (
    <motion.div
      className="accent-gradient text-6xl font-black leading-none"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.div>
  );
}

function DiagnosisVisual() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % DIAGNOSIS_METRICS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-500/5 dark:border-white/10 dark:bg-navy-800/80 dark:shadow-cyan-500/5"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.4 }}
    >
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
        <AnimatedScore value={78} />
        <div className="pb-1">
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            GEO综合评分
          </div>
          <div className="text-xs text-slate-400">中等 · 有较大提升空间</div>
        </div>
      </div>

      <div className="space-y-3">
        {DIAGNOSIS_METRICS.map((row, idx) => {
          const isActive = active === idx;
          return (
            <motion.button
              key={row.label}
              type="button"
              onClick={() => setActive(idx)}
              className={`w-full rounded-xl px-2 py-2 text-left transition ${
                isActive
                  ? "bg-blue-50 ring-1 ring-blue-200 dark:bg-cyan-500/10 dark:ring-cyan-500/30"
                  : "hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
            >
              <div className="mb-1 flex justify-between text-xs">
                <span
                  className={
                    isActive
                      ? "font-semibold text-blue-700 dark:text-cyan-300"
                      : "text-slate-500 dark:text-slate-400"
                  }
                >
                  {row.label}
                </span>
                <motion.span
                  className="font-semibold text-slate-700 dark:text-slate-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {row.value}
                </motion.span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <motion.div
                  className={`h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500 ${
                    isActive ? "shadow-[0_0_12px_rgba(59,130,246,0.55)]" : ""
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: inView ? `${row.value}%` : 0,
                    filter: isActive
                      ? ["brightness(1)", "brightness(1.25)", "brightness(1)"]
                      : "brightness(1)",
                  }}
                  transition={{
                    width: {
                      delay: 0.25 + idx * 0.12,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    filter: { duration: 1.6, repeat: isActive ? Infinity : 0 },
                  }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative mt-4 min-h-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-navy-900/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={DIAGNOSIS_METRICS[active].label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mb-1 text-xs font-bold text-blue-600 dark:text-cyan-400">
              {DIAGNOSIS_METRICS[active].label} · {DIAGNOSIS_METRICS[active].value}分
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {DIAGNOSIS_METRICS[active].tip}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {DIAGNOSIS_METRICS.map((row, idx) => (
          <button
            key={row.label}
            type="button"
            aria-label={`切换到${row.label}`}
            onClick={() => setActive(idx)}
            className={`h-1.5 rounded-full transition-all ${
              active === idx
                ? "w-5 bg-blue-500 dark:bg-cyan-400"
                : "w-1.5 bg-slate-300 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </motion.div>
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
  const [dimActive, setDimActive] = useState(0);
  const dimensions = block.dimensions || [];

  useEffect(() => {
    if (!dimensions.length) return;
    const timer = window.setInterval(() => {
      setDimActive((prev) => (prev + 1) % dimensions.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [dimensions.length]);

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

          {dimensions.length ? (
            <div className="mb-8">
              <h3 className="mb-4 text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-white">
                {block.contentsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {dimensions.map((d, idx) => {
                  const isActive = dimActive === idx;
                  return (
                    <motion.button
                      key={d}
                      type="button"
                      onClick={() => setDimActive(idx)}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.35 }}
                      animate={
                        isActive
                          ? {
                              scale: 1.03,
                              borderColor: "rgba(59,130,246,0.55)",
                            }
                          : { scale: 1 }
                      }
                      className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                        isActive
                          ? "border-blue-300 bg-blue-50 text-blue-800 shadow-sm dark:border-cyan-400/40 dark:bg-cyan-500/10 dark:text-cyan-200"
                          : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-navy-900/60 dark:text-slate-300"
                      }`}
                    >
                      {d}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {block.reportItems?.length ? (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-white">
                报告包含内容
              </h3>
              <ul className="space-y-2">
                {block.reportItems.map((item, idx) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.06 }}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-cyan-400" />
                    {item}
                  </motion.li>
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

function DefaultVisual() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-white/15 dark:bg-navy-800/50">
      <Sparkles className="mx-auto mb-3 h-8 w-8 text-blue-500 dark:text-cyan-400" />
      <p className="text-sm text-slate-500 dark:text-slate-400">服务示意模块</p>
    </div>
  );
}

function visualForLayout(layout: ServiceBlock["layout"]) {
  switch (layout) {
    case "social":
      return <SocialVisual />;
    case "geo":
      return <GeoVisual />;
    case "authority":
      return <AuthorityVisual />;
    default:
      return <DefaultVisual />;
  }
}

export function ServicesPageView({
  hero,
  blocks,
}: {
  hero: ServicesPageHero;
  blocks: ServiceBlock[];
}) {
  return (
    <div className="bg-white transition-colors dark:bg-navy-900">
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-4 text-sm font-semibold tracking-wide text-blue-600 dark:text-cyan-400">
              {hero.eyebrow}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
              {hero.titleBefore}{" "}
              <span className="accent-gradient">{hero.titleHighlight}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-500 md:text-xl dark:text-slate-400">
              {hero.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {blocks.map((block) => {
          if (block.layout === "diagnosis") {
            return <DiagnosisSection key={block.id} block={block} />;
          }
          return (
            <SplitService
              key={block.id}
              block={block}
              reverse={block.layout === "geo"}
              visual={visualForLayout(block.layout)}
            />
          );
        })}
      </div>
    </div>
  );
}
