"use client";

import { useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

export function PageJsonEditor({
  slug,
  title,
  initial,
}: {
  slug: string;
  title: string;
  initial: string;
}) {
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
      setMessage("JSON 格式无效");
      return;
    }

    const res = await fetch(`/api/admin/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, data: value }),
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

  return (
    <div className="admin-card">
      <StatusBanner message={message} error={error} />
      <textarea
        className="admin-input min-h-[480px] font-mono text-xs leading-relaxed"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={save} disabled={loading} className="admin-btn mt-4">
        {loading ? "保存中..." : "保存"}
      </button>
    </div>
  );
}
