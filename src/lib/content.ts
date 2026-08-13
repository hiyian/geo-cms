import { prisma } from "./db";
import type {
  AboutPageData,
  ContactPageData,
  HomePageData,
} from "./types";

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!settings) {
    throw new Error("Site settings missing. Run: npm run db:seed");
  }
  return settings;
}

export async function getPageData<T>(slug: string): Promise<T> {
  const page = await prisma.pageContent.findUnique({ where: { slug } });
  if (!page) {
    throw new Error(`Page content missing: ${slug}`);
  }
  return JSON.parse(page.data) as T;
}

export async function getHomeData() {
  const data = await getPageData<HomePageData & { hero?: { demo?: unknown; demos?: unknown } }>(
    "home",
  );

  // Backward compat: migrate old single `demo` to `demos`
  const hero = data.hero as HomePageData["hero"] & { demo?: HomePageData["hero"]["demos"][number] };
  if ((!hero.demos || hero.demos.length === 0) && hero.demo) {
    hero.demos = [{ ...hero.demo, id: "legacy", assistantAccent: "orange" }];
  }
  if (!hero.eyebrow) hero.eyebrow = "";
  if (!hero.platforms) hero.platforms = [];
  if (!data.servicesSection.badge) data.servicesSection.badge = "What GEO Covers";
  if (!data.servicesSection.covers) data.servicesSection.covers = [];

  return data as HomePageData;
}

export async function getAboutData() {
  return getPageData<AboutPageData>("about");
}

export async function getContactData() {
  return getPageData<ContactPageData>("contact");
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedFaqs() {
  return prisma.faq.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedCases() {
  return prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function parseMetrics(
  value: string,
): { label: string; value: string }[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      label: String(item.label ?? ""),
      value: String(item.value ?? ""),
    }));
  } catch {
    return [];
  }
}
