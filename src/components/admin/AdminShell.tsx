"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "概览" },
  { href: "/admin/settings", label: "站点设置" },
  { href: "/admin/home", label: "首页内容" },
  { href: "/admin/pages", label: "其他页面" },
  { href: "/admin/services", label: "服务" },
  { href: "/admin/cases", label: "案例" },
  { href: "/admin/blog", label: "博客" },
  { href: "/admin/faqs", label: "FAQ" },
  { href: "/admin/leads", label: "线索" },
];

export function AdminShell({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-56 shrink-0 rounded-2xl border border-white/10 bg-navy-900/80 p-4 md:block">
          <div className="mb-6 px-2">
            <div className="text-lg font-bold text-white">GeoCMS</div>
            <div className="text-xs text-slate-500">内容管理后台</div>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-cyan-500/15 font-medium text-cyan-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 border-t border-white/10 pt-4 px-2">
            <div className="mb-3 text-xs text-slate-500">已登录：{username}</div>
            <button onClick={logout} className="admin-btn-ghost w-full text-xs">
              退出登录
            </button>
            <Link href="/" className="mt-2 block text-center text-xs text-cyan-400 hover:text-cyan-300">
              查看前台
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap gap-2 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
