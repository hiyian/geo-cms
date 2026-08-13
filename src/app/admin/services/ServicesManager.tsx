"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

type ServiceRow = {
  id: string;
  title: string;
  summary: string;
  description: string;
  featuresText: string;
  accent: string;
  badge: string;
  href: string;
  sortOrder: number;
  published: boolean;
};

export function ServicesManager({ initial }: { initial: ServiceRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function createItem() {
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "新服务",
        summary: "一句话介绍",
        description: "详细描述",
        features: ["卖点1", "卖点2"],
        accent: "cyan",
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

  async function saveItem(item: ServiceRow) {
    const res = await fetch(`/api/admin/services/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...item,
        features: item.featuresText,
      }),
    });
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setError(false);
    setMessage(`已保存：${item.title}`);
    router.refresh();
  }

  async function removeItem(id: string) {
    if (!confirm("确认删除？")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((x) => x.id !== id));
    setMessage("已删除");
  }

  return (
    <div className="space-y-4">
      <StatusBanner message={message} error={error} />
      <button onClick={createItem} className="admin-btn">
        + 新增服务
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
              <label className="admin-label">强调色 accent</label>
              <input
                className="admin-input"
                value={item.accent}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, accent: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">摘要</label>
              <input
                className="admin-input"
                value={item.summary}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, summary: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">详细描述</label>
              <textarea
                className="admin-input"
                rows={2}
                value={item.description}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, description: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">卖点（每行一条）</label>
              <textarea
                className="admin-input"
                rows={3}
                value={item.featuresText}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, featuresText: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div>
              <label className="admin-label">角标 badge</label>
              <input
                className="admin-input"
                value={item.badge}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, badge: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div>
              <label className="admin-label">链接</label>
              <input
                className="admin-input"
                value={item.href}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, href: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div>
              <label className="admin-label">排序</label>
              <input
                type="number"
                className="admin-input"
                value={item.sortOrder}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, sortOrder: Number(e.target.value) };
                  setItems(next);
                }}
              />
            </div>
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={item.published}
                  onChange={(e) => {
                    const next = [...items];
                    next[idx] = { ...item, published: e.target.checked };
                    setItems(next);
                  }}
                />
                发布
              </label>
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
