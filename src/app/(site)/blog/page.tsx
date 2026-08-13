import Link from "next/link";
import { FadeIn } from "@/components/site/FadeIn";
import { getPublishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="bg-white pt-32 pb-24 transition-colors dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
            GEO知识库
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">GEO 与 AI 搜索优化洞察</p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post, idx) => (
            <FadeIn key={post.id} delay={idx * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-navy-800/50 dark:hover:border-cyan-400/40"
              >
                <div className="mb-4 inline-block rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                  {post.coverLabel}
                </div>
                <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="mb-4 text-slate-500 dark:text-slate-400">{post.excerpt}</p>
                <div className="text-xs text-slate-400">
                  {new Date(post.publishedAt).toLocaleDateString("zh-CN")}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
