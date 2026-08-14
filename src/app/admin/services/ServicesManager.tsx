"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";
import type { ServiceLayout, ServicesPageHero } from "@/lib/types";

type ServiceRow = {
  id: string;
  title: string;
  summary: string;
  description: string;
  featuresText: string;
  layout: ServiceLayout;
  scenariosTitle: string;
  scenariosText: string;
  contentsTitle: string;
  promiseTitle: string;
  promise: string;
  dimensionsText: string;
  reportItemsText: string;
  ctaText: string;
  accent: string;
  badge: string;
  href: string;
  sortOrder: number;
  published: boolean;
};

const LAYOUT_OPTIONS: { value: ServiceLayout; label: string }[] = [
  { value: "diagnosis", label: "诊断报告（含评分卡）" },
  { value: "social", label: "社媒搜索" },
  { value: "geo", label: "GEO 引擎优化" },
  { value: "authority", label: "权威背书" },
  { value: "default", label: "通用分栏" },
];

function patchItem(
  items: ServiceRow[],
  idx: number,
  patch: Partial<ServiceRow>,
): ServiceRow[] {
  const next = [...items];
  next[idx] = { ...items[idx], ...patch };
  return next;
}

export function ServicesManager({
  initial,
  initialHero,
}: {
  initial: ServiceRow[];
  initialHero: ServicesPageHero;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [hero, setHero] = useState(initialHero);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function saveHero() {
    const res = await fetch("/api/admin/pages/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "服务页", data: hero }),
    });
    if (!res.ok) {
      setError(true);
      setMessage("页头保存失败");
      return;
    }
    setError(false);
    setMessage("已保存服务页头");
    router.refresh();
  }

  async function createItem() {
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "新服务",
        summary: "一句话介绍",
        description: "",
        features: ["卖点1", "卖点2"],
        layout: "default",
        contentsTitle: "服务内容",
        promiseTitle: "效果承诺",
        promise: "",
        ctaText: "获取方案",
        accent: "cyan",
        sortOrder: items.length + 1,
        published: true,
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
        title: item.title,
        summary: item.summary,
        description: item.promise || item.description,
        features: item.featuresText,
        layout: item.layout,
        scenariosTitle: item.scenariosTitle,
        scenarios: item.scenariosText,
        contentsTitle: item.contentsTitle,
        promiseTitle: item.promiseTitle,
        promise: item.promise,
        dimensions: item.dimensionsText,
        reportItems: item.reportItemsText,
        ctaText: item.ctaText,
        accent: item.accent,
        badge: item.badge,
        href: item.href,
        sortOrder: item.sortOrder,
        published: item.published,
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
    if (!confirm("确认删除？前台对应服务区块会同步消失。")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((x) => x.id !== id));
    setMessage("已删除");
  }

  return (
    <div className="space-y-6">
      <StatusBanner message={message} error={error} />

      <div className="admin-card space-y-3">
        <h2 className="text-lg font-bold text-white">服务页头</h2>
        <p className="text-sm text-slate-500">对应前台 /services 顶部标题区</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="admin-label">眉题</label>
            <input
              className="admin-input"
              value={hero.eyebrow}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
            />
          </div>
          <div>
            <label className="admin-label">标题前缀</label>
            <input
              className="admin-input"
              value={hero.titleBefore}
              onChange={(e) => setHero({ ...hero, titleBefore: e.target.value })}
            />
          </div>
          <div>
            <label className="admin-label">标题高亮</label>
            <input
              className="admin-input"
              value={hero.titleHighlight}
              onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">副标题</label>
            <textarea
              className="admin-input"
              rows={2}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            />
          </div>
        </div>
        <button onClick={saveHero} className="admin-btn">
          保存页头
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          下方每条服务会直接渲染到前台服务页；布局决定右侧示意样式。
        </p>
        <button onClick={createItem} className="admin-btn shrink-0">
          + 新增服务
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={item.id} className="admin-card space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="admin-label">标题</label>
              <input
                className="admin-input"
                value={item.title}
                onChange={(e) => setItems(patchItem(items, idx, { title: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">布局 layout</label>
              <select
                className="admin-input"
                value={item.layout}
                onChange={(e) =>
                  setItems(
                    patchItem(items, idx, {
                      layout: e.target.value as ServiceLayout,
                    }),
                  )
                }
              >
                {LAYOUT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">摘要（正文介绍）</label>
              <textarea
                className="admin-input"
                rows={3}
                value={item.summary}
                onChange={(e) => setItems(patchItem(items, idx, { summary: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">角标 badge</label>
              <input
                className="admin-input"
                value={item.badge}
                onChange={(e) => setItems(patchItem(items, idx, { badge: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">CTA 文案</label>
              <input
                className="admin-input"
                value={item.ctaText}
                onChange={(e) => setItems(patchItem(items, idx, { ctaText: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">链接</label>
              <input
                className="admin-input"
                value={item.href}
                onChange={(e) => setItems(patchItem(items, idx, { href: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">强调色 accent</label>
              <input
                className="admin-input"
                value={item.accent}
                onChange={(e) => setItems(patchItem(items, idx, { accent: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">场景/价值标题</label>
              <input
                className="admin-input"
                value={item.scenariosTitle}
                placeholder="适用场景 / 核心价值"
                onChange={(e) =>
                  setItems(patchItem(items, idx, { scenariosTitle: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="admin-label">服务内容标题</label>
              <input
                className="admin-input"
                value={item.contentsTitle}
                onChange={(e) =>
                  setItems(patchItem(items, idx, { contentsTitle: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">场景/价值列表（每行一条）</label>
              <textarea
                className="admin-input"
                rows={3}
                value={item.scenariosText}
                onChange={(e) =>
                  setItems(patchItem(items, idx, { scenariosText: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">服务内容（每行一条）</label>
              <textarea
                className="admin-input"
                rows={4}
                value={item.featuresText}
                onChange={(e) =>
                  setItems(patchItem(items, idx, { featuresText: e.target.value }))
                }
              />
            </div>
            {item.layout === "diagnosis" ? (
              <>
                <div className="md:col-span-2">
                  <label className="admin-label">8维评估（每行一条）</label>
                  <textarea
                    className="admin-input"
                    rows={4}
                    value={item.dimensionsText}
                    onChange={(e) =>
                      setItems(patchItem(items, idx, { dimensionsText: e.target.value }))
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">报告包含内容（每行一条）</label>
                  <textarea
                    className="admin-input"
                    rows={3}
                    value={item.reportItemsText}
                    onChange={(e) =>
                      setItems(patchItem(items, idx, { reportItemsText: e.target.value }))
                    }
                  />
                </div>
              </>
            ) : null}
            <div>
              <label className="admin-label">承诺/优势标题</label>
              <input
                className="admin-input"
                value={item.promiseTitle}
                onChange={(e) =>
                  setItems(patchItem(items, idx, { promiseTitle: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">承诺/优势正文</label>
              <textarea
                className="admin-input"
                rows={2}
                value={item.promise}
                onChange={(e) => setItems(patchItem(items, idx, { promise: e.target.value }))}
              />
            </div>
            <div>
              <label className="admin-label">排序</label>
              <input
                type="number"
                className="admin-input"
                value={item.sortOrder}
                onChange={(e) =>
                  setItems(patchItem(items, idx, { sortOrder: Number(e.target.value) }))
                }
              />
            </div>
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={item.published}
                  onChange={(e) =>
                    setItems(patchItem(items, idx, { published: e.target.checked }))
                  }
                />
                发布到前台
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
