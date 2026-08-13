import { prisma } from "@/lib/db";
import { BlogManager } from "./BlogManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">博客管理</h1>
      <p className="mb-8 text-slate-500">发布与编辑文章</p>
      <BlogManager initial={posts} />
    </div>
  );
}
