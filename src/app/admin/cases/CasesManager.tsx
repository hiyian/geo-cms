"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

type CaseRow = {
  id: string;
  title: string;
  industry: string;
  summary: string;
  result: string;
  metricsText: string;
  sortOrder: number;
  published: boolean;
};

export function CasesManager({ initial }: { initial: CaseRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => setItems(initial), [initial]);

  async function createItem() {
    const res = await fetch("/api/admin/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "新案例",
        industry: "行业",
        summary: "案例简介",
        result: "成果描述",
        metrics: "指标|+100%\n转化|+30%",
        sortOrder: items.length + 1,
      }),
    });
    if (!res.ok) {
      setError(true);
      setMessage("创建失败");
      return;
    }
    setMessage("已创建");
    setError(false);
    router.refresh();
  }

  async function saveItem(item: CaseRow) {
    const res = await fetch(`/api/admin/cases/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, metrics: item.metricsText }),
    });
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setMessage("已保存");
    setError(false);
    router.refresh();
  }

  async function removeItem(id: string) {
    if (!confirm("确认删除？")) return;
    await fetch(`/api/admin/cases/${id}`, { method: "DELETE" });
    setMessage("已删除");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <StatusBanner message={message} error={error} />
      <button onClick={createItem} className="admin-btn">
        + 新增案例
      </button>
      {items.map((item, idx) => (
        <div key={item.id} className="admin-card space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="admin-label">标题</label>
              <input
                className="admin-input"
                value={item.title}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, title: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div>
              <label className="admin-label">行业</label>
              <input
                className="admin-input"
                value={item.industry}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, industry: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">简介</label>
              <textarea
                className="admin-input"
                rows={2}
                value={item.summary}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, summary: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">成果</label>
              <textarea
                className="admin-input"
                rows={2}
                value={item.result}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, result: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">指标（每行 标签|数值）</label>
              <textarea
                className="admin-input"
                rows={3}
                value={item.metricsText}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, metricsText: e.target.value };
                  setItems(next);
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => saveItem(item)} className="admin-btn">
              保存
            </button>
            <button onClick={() => removeItem(item.id)} className="admin-btn-ghost">
              删除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
