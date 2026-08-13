"use client";

import { FormEvent, useState } from "react";

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-cyan-400/50";

export function ContactForm({ successMessage }: { successMessage: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      company: String(form.get("company") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      setDone(true);
      e.currentTarget.reset();
    } catch {
      setError("提交失败，请稍后再试或直接电话联系我们。");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-green-700 dark:text-green-300">
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-slate-500">姓名</label>
        <input name="name" required className={fieldClass} placeholder="怎么称呼您" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-slate-500">手机号</label>
        <input name="phone" required className={fieldClass} placeholder="方便我们联系您" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-slate-500">公司/品牌</label>
        <input name="company" className={fieldClass} placeholder="选填" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-slate-500">需求描述</label>
        <textarea
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="简单描述您的行业与目标"
        />
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-cyan-500 dark:text-navy-900 dark:hover:bg-cyan-400"
      >
        {loading ? "提交中..." : "提交预约"}
      </button>
    </form>
  );
}
