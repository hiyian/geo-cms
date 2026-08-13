"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Item = { id: string; question: string; answer: string };

export function FaqList({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-white/5 dark:bg-navy-800/50 dark:hover:border-primary/30"
          >
            <button
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="text-lg font-medium text-slate-900 dark:text-white">
                {item.question}
              </span>
              {open ? (
                <Minus className="h-5 w-5 shrink-0 text-blue-600 dark:text-cyan-400" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-slate-400" />
              )}
            </button>
            {open && (
              <div className="border-t border-slate-100 px-6 pb-6 leading-relaxed text-slate-500 dark:border-white/5 dark:text-slate-400">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
