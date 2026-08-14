"use client";

import { FormEvent, useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";

export function PasswordForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: data.get("currentPassword"),
        newPassword: data.get("newPassword"),
        confirmPassword: data.get("confirmPassword"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      const code = payload?.error;
      setError(true);
      if (code === "invalid_current") setMessage("当前密码不正确");
      else if (code === "too_short") setMessage("新密码至少 8 位");
      else if (code === "mismatch") setMessage("两次输入的新密码不一致");
      else setMessage("修改失败");
      return;
    }

    form.reset();
    setError(false);
    setMessage("密码已更新，下次登录请使用新密码");
  }

  return (
    <form onSubmit={onSubmit} className="admin-card mt-8 space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">修改管理员密码</h2>
        <p className="mt-1 text-sm text-slate-500">
          修改后立即生效；仅影响当前登录账号
        </p>
      </div>
      <StatusBanner message={message} error={error} />
      <div>
        <label className="admin-label">当前密码</label>
        <input
          name="currentPassword"
          type="password"
          className="admin-input"
          autoComplete="current-password"
          required
        />
      </div>
      <div>
        <label className="admin-label">新密码</label>
        <input
          name="newPassword"
          type="password"
          className="admin-input"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
      <div>
        <label className="admin-label">确认新密码</label>
        <input
          name="confirmPassword"
          type="password"
          className="admin-input"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
      <button type="submit" disabled={loading} className="admin-btn">
        {loading ? "保存中..." : "更新密码"}
      </button>
    </form>
  );
}
