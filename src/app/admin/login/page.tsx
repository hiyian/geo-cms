"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      setError("用户名或密码错误");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navy-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-2xl font-bold text-white">GeoCMS 后台登录</h1>
        <p className="mb-8 text-sm text-slate-500">管理营销站内容与询盘</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="admin-label">用户名</label>
            <input name="username" className="admin-input" defaultValue="admin" required />
          </div>
          <div>
            <label className="admin-label">密码</label>
            <input name="password" type="password" className="admin-input" required />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button type="submit" disabled={loading} className="admin-btn w-full">
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
}
