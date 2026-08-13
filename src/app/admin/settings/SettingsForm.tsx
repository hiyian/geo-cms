"use client";

import { FormEvent, useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

type Settings = {
  siteName: string;
  logoText: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  copyright: string;
  icp: string;
  navCtaText: string;
  navCtaHref: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

export function SettingsForm({ settings }: { settings: Settings }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setError(false);
    setMessage("已保存");
  }

  const fields: Array<[keyof Settings, string, boolean?]> = [
    ["siteName", "站点名称"],
    ["logoText", "Logo 文字"],
    ["tagline", "标语"],
    ["phone", "电话"],
    ["email", "邮箱"],
    ["address", "地址"],
    ["copyright", "版权文案"],
    ["icp", "ICP 备案号"],
    ["navCtaText", "导航 CTA 文案"],
    ["navCtaHref", "导航 CTA 链接"],
    ["seoTitle", "SEO 标题"],
    ["seoDescription", "SEO 描述", true],
    ["seoKeywords", "SEO 关键词"],
  ];

  return (
    <form onSubmit={onSubmit} className="admin-card space-y-4">
      <StatusBanner message={message} error={error} />
      {fields.map(([key, label, textarea]) => (
        <div key={key}>
          <label className="admin-label">{label}</label>
          {textarea ? (
            <textarea
              name={key}
              rows={3}
              className="admin-input"
              defaultValue={settings[key]}
            />
          ) : (
            <input name={key} className="admin-input" defaultValue={settings[key]} />
          )}
        </div>
      ))}
      <button type="submit" disabled={loading} className="admin-btn">
        {loading ? "保存中..." : "保存设置"}
      </button>
    </form>
  );
}
