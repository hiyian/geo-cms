"use client";

import { useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

export function HomeJsonEditor({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMessage("");
    try {
      JSON.parse(value);
    } catch {
      setLoading(false);
      setError(true);
      setMessage("JSON 格式无效，请检查逗号/引号");
      return;
    }

    const res = await fetch("/api/admin/pages/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "首页", data: value }),
    });

    setLoading(false);
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setError(false);
    setMessage("首页内容已保存");
  }

  return (
    <div className="admin-card">
      <StatusBanner message={message} error={error} />
      <textarea
        className="admin-input min-h-[560px] font-mono text-xs leading-relaxed"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="mt-4 flex gap-3">
        <button onClick={save} disabled={loading} className="admin-btn">
          {loading ? "保存中..." : "保存首页内容"}
        </button>
        <button
          onClick={() => {
            try {
              setValue(JSON.stringify(JSON.parse(value), null, 2));
            } catch {
              setError(true);
              setMessage("无法格式化：JSON 无效");
            }
          }}
          className="admin-btn-ghost"
          type="button"
        >
          格式化 JSON
        </button>
      </div>
    </div>
  );
}
