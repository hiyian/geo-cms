"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, CircleX } from "lucide-react";
import type { HeroDemoScene } from "@/lib/types";
import { cn } from "@/lib/utils";

const accentMap = {
  orange: "from-orange-500 to-amber-500",
  purple: "from-purple-500 to-pink-500",
  cyan: "from-cyan-500 to-blue-500",
};

type Props = {
  demos: HeroDemoScene[];
  autoPlayMs?: number;
};

export function AnimatedChatDemo({ demos, autoPlayMs = 9000 }: Props) {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const scene = demos[active] ?? demos[0];
  const accent = accentMap[scene?.assistantAccent || "orange"];

  // Replay animation whenever scene changes
  useEffect(() => {
    setStep(0);
    const timers = [
      window.setTimeout(() => setStep(1), 200), // user message
      window.setTimeout(() => setStep(2), 700), // ai bubble
      window.setTimeout(() => setStep(3), 1100), // item 1
      window.setTimeout(() => setStep(4), 1500), // item 2
      window.setTimeout(() => setStep(5), 1900), // item 3
      window.setTimeout(() => setStep(6), 2300), // footer
      window.setTimeout(() => setStep(7), 2600), // badges
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, scene?.id]);

  // Auto rotate scenes
  useEffect(() => {
    if (demos.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % demos.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [demos.length, autoPlayMs]);

  if (!scene) return null;

  return (
    <div className="relative w-full max-w-[520px]">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-linear-to-br dark:from-navy-800/95 dark:via-navy-900/98 dark:to-navy-950/95">
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-3.5 dark:border-white/5 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="flex items-center gap-3">
            <motion.div
              key={`${scene.id}-avatar`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br",
                accent,
              )}
            >
              <Bot className="h-5 w-5 text-white" />
            </motion.div>
            <motion.div
              key={`${scene.id}-name`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {scene.assistantName}
              </span>
              <span className="ml-2 text-xs text-slate-500">{scene.assistantLabel}</span>
            </motion.div>
          </div>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          </div>
        </div>

        <div className="min-h-[420px] space-y-4 p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-linear-to-r from-cyan-600 to-blue-600 px-4 py-3 text-white shadow-lg">
                    <p className="text-sm leading-relaxed">{scene.userMessage}</p>
                  </div>
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-3"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                      accent,
                    )}
                  >
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <p className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {scene.aiIntro}
                    </p>
                    <div className="mb-3 space-y-2.5">
                      {scene.items.map((item, idx) => {
                        const visible = step >= 3 + idx;
                        if (!visible) return null;
                        return item.highlight ? (
                          <motion.div
                            key={`${scene.id}-${item.rank}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative overflow-hidden"
                          >
                            <div className="flex items-start gap-3 rounded-xl border border-cyan-400/30 bg-linear-to-r from-cyan-500/15 to-purple-500/10 p-3">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-500 text-xs font-bold text-white">
                                {item.rank}
                              </div>
                              <div className="flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                  <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                                    {item.name}
                                  </span>
                                  {item.badge ? (
                                    <span className="rounded bg-cyan-400/20 px-1.5 py-0.5 text-[10px] text-cyan-700 dark:text-cyan-300">
                                      {item.badge}
                                    </span>
                                  ) : null}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {item.tags}
                                </p>
                              </div>
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-500 dark:text-cyan-400" />
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-r from-cyan-400/5 to-transparent" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key={`${scene.id}-${item.rank}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/60 p-3 dark:border-white/5 dark:bg-white/3"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-400 text-xs font-medium text-white dark:bg-slate-600">
                              {item.rank}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {item.name}
                              </span>
                              <p className="text-xs text-slate-500">{item.tags}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    {step >= 6 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35 }}
                        className="border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-white/5 dark:text-slate-400"
                      >
                        {scene.footerNote}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/3">
            <span className="flex-1 text-sm text-slate-500">输入消息...</span>
            <div className="flex gap-1.5">
              {demos.map((d, idx) => (
                <button
                  key={d.id}
                  type="button"
                  aria-label={`切换场景 ${idx + 1}`}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === active
                      ? "w-4 bg-cyan-400"
                      : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500",
                  )}
                />
              ))}
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 dark:text-slate-600" />
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />

      <AnimatePresence>
        {step >= 7 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.45 }}
              className="absolute top-1/4 -right-4 rounded-xl border border-green-500/20 bg-linear-to-r from-green-500/20 to-emerald-500/10 px-4 py-3 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {scene.badgeGood}
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="absolute bottom-1/4 -left-8 rounded-xl border border-red-500/20 bg-linear-to-r from-red-500/20 to-orange-500/10 px-4 py-3 shadow-lg backdrop-blur-md"
            >
              <div className="mb-1 text-[10px] text-slate-500">{scene.badgeBadLabel}</div>
              <div className="flex items-center gap-2">
                <CircleX className="h-4 w-4 text-red-400" />
                <span className="text-xs font-medium text-red-500 dark:text-red-400">
                  {scene.badgeBad}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
