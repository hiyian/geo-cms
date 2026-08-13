"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
};

export function FaqsManager({ initial }: { initial: FaqRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => setItems(initial), [initial]);

  async function createItem() {
    const res = await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "新问题？",
        answer: "答案内容",
        sortOrder: items.length + 1,
      }),
    });
    if (!res.ok) {
      setError(true);
      setMessage("创建失败");
      return;
    }
    setError(false);
    setMessage("已创建");
    router.refresh();
  }

  async function saveItem(item: FaqRow) {
    const res = await fetch(`/api/admin/faqs/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setError(false);
    setMessage("已保存");
    router.refresh();
  }

  async function removeItem(id: string) {
    if (!confirm("确认删除？")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    setMessage("已删除");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <StatusBanner message={message} error={error} />
      <button onClick={createItem} className="admin-btn">
        + 新增 FAQ
      </button>
      {items.map((item, idx) => (
        <div key={item.id} className="admin-card space-y-3">
          <div>
            <label className="admin-label">问题</label>
            <input
              className="admin-input"
              value={item.question}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, question: e.target.value };
                setItems(next);
              }}
            />
          </div>
          <div>
            <label className="admin-label">答案</label>
            <textarea
              className="admin-input"
              rows={3}
              value={item.answer}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, answer: e.target.value };
                setItems(next);
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="admin-label">排序</label>
              <input
                type="number"
                className="admin-input w-28"
                value={item.sortOrder}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, sortOrder: Number(e.target.value) };
                  setItems(next);
                }}
              />
            </div>
            <label className="mt-5 flex items-center gap-2 text-sm text-slate-400">
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
