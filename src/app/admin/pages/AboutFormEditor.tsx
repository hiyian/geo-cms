"use client";

import { useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from "@/components/admin/FormFields";
import type { AboutPageData } from "@/lib/types";

export function AboutFormEditor({ initial }: { initial: AboutPageData }) {
  const [data, setData] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/pages/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "关于我们", data }),
    });
    setLoading(false);
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setError(false);
    setMessage("关于页已保存");
  }

  return (
    <div className="space-y-4">
      <StatusBanner message={message} error={error} />
      <SectionCard title="页面标题">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="主标题">
            <TextInput
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </Field>
          <Field label="副标题">
            <TextInput
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="介绍段落"
        desc="每段一段话，会按顺序显示"
        actions={
          <button
            type="button"
            className="admin-btn"
            onClick={() =>
              setData({ ...data, paragraphs: [...data.paragraphs, "新段落"] })
            }
          >
            + 新增段落
          </button>
        }
      >
        <div className="space-y-3">
          {data.paragraphs.map((p, idx) => (
            <div key={idx} className="flex gap-3">
              <TextArea
                rows={3}
                className="flex-1"
                value={p}
                onChange={(e) => {
                  const paragraphs = [...data.paragraphs];
                  paragraphs[idx] = e.target.value;
                  setData({ ...data, paragraphs });
                }}
              />
              <button
                type="button"
                className="admin-btn-ghost h-fit"
                onClick={() =>
                  setData({
                    ...data,
                    paragraphs: data.paragraphs.filter((_, i) => i !== idx),
                  })
                }
              >
                删除
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="亮点卡片"
        actions={
          <button
            type="button"
            className="admin-btn"
            onClick={() =>
              setData({
                ...data,
                highlights: [...data.highlights, { title: "新亮点", desc: "说明" }],
              })
            }
          >
            + 新增亮点
          </button>
        }
      >
        <div className="space-y-3">
          {data.highlights.map((h, idx) => (
            <div key={idx} className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
              <Field label="标题">
                <TextInput
                  value={h.title}
                  onChange={(e) => {
                    const highlights = [...data.highlights];
                    highlights[idx] = { ...h, title: e.target.value };
                    setData({ ...data, highlights });
                  }}
                />
              </Field>
              <Field label="说明">
                <TextInput
                  value={h.desc}
                  onChange={(e) => {
                    const highlights = [...data.highlights];
                    highlights[idx] = { ...h, desc: e.target.value };
                    setData({ ...data, highlights });
                  }}
                />
              </Field>
              <button
                type="button"
                className="admin-btn-ghost w-fit text-xs"
                onClick={() =>
                  setData({
                    ...data,
                    highlights: data.highlights.filter((_, i) => i !== idx),
                  })
                }
              >
                删除此亮点
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <button type="button" onClick={save} disabled={loading} className="admin-btn">
        {loading ? "保存中..." : "保存关于页"}
      </button>
    </div>
  );
}
