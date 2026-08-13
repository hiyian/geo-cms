"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverLabel: string;
  published: boolean;
};

export function BlogManager({ initial }: { initial: PostRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => setItems(initial), [initial]);

  async function createItem() {
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "新文章",
        slug: `post-${Date.now()}`,
        excerpt: "摘要",
        content: "## 标题\n\n正文内容",
        coverLabel: "GEO",
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

  async function saveItem(item: PostRow) {
    const res = await fetch(`/api/admin/blog/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
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
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setMessage("已删除");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <StatusBanner message={message} error={error} />
      <button onClick={createItem} className="admin-btn">
        + 新增文章
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
              <label className="admin-label">Slug</label>
              <input
                className="admin-input"
                value={item.slug}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, slug: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div>
              <label className="admin-label">封面标签</label>
              <input
                className="admin-input"
                value={item.coverLabel}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, coverLabel: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="flex items-end">
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
            <div className="md:col-span-2">
              <label className="admin-label">摘要</label>
              <input
                className="admin-input"
                value={item.excerpt}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, excerpt: e.target.value };
                  setItems(next);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">正文</label>
              <textarea
                className="admin-input font-mono text-xs"
                rows={8}
                value={item.content}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, content: e.target.value };
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
