import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pt-32 pb-24">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="mb-8 inline-block text-sm text-cyan-400 hover:text-cyan-300">
          ← 返回博客
        </Link>
        <div className="mb-4 inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400">
          {post.coverLabel}
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{post.title}</h1>
        <p className="mb-10 text-slate-500">
          {new Date(post.publishedAt).toLocaleDateString("zh-CN")}
        </p>
        <div className="prose-invert space-y-4 whitespace-pre-wrap text-slate-300 leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}
