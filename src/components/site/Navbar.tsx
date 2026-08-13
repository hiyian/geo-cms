"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我们" },
  { href: "/services", label: "GEO服务" },
  { href: "/blog", label: "GEO知识库" },
  { href: "/#faq", label: "常见问题" },
  { href: "/contact", label: "联系我们" },
];

type Props = {
  siteName: string;
  ctaText: string;
  ctaHref: string;
};

export function Navbar({ siteName, ctaText, ctaHref }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-100/60 bg-white/70 py-2 backdrop-blur-xl transition-all duration-300 dark:border-white/5 dark:bg-navy-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white md:text-2xl">
              <span className="font-light">{siteName.replace("GEO", "")}</span>
              <span className="accent-gradient">GEO</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? false
                    : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active
                      ? "text-blue-600 dark:text-cyan-400"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
            <Link
              href={ctaHref}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-105 dark:bg-white dark:text-slate-900"
            >
              {ctaText}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-white/10 dark:text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 dark:border-white/10 dark:bg-navy-900 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base text-slate-700 dark:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-bold text-white dark:bg-white dark:text-slate-900"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
